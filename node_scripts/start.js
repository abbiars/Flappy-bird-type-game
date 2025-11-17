const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 5173
const publicDir = path.join(__dirname, '..', 'public')

const clients = new Set()

function contentTypeFromExt(ext) {
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8'
    case '.css': return 'text/css; charset=utf-8'
    case '.js': return 'text/javascript; charset=utf-8'
    case '.mjs': return 'text/javascript; charset=utf-8'
    case '.json': return 'application/json; charset=utf-8'
    case '.png': return 'image/png' 
    case '.jpg': case '.jpeg': return 'image/jpeg'
    case '.svg': return 'image/svg+xml'
    default: return 'application/octet-stream'
  }
}

function sendReload() {
  for (const res of clients) {
    try {
      res.write('event: reload\n')
      res.write('data: reload\n\n')
    } catch (err) {
      clients.delete(res)
    }
  }
}

function serveFile(req, res, filepath) {
  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      return res.end('Not found')
    }

    const ext = path.extname(filepath).toLowerCase()
    const ctype = contentTypeFromExt(ext)
    res.writeHead(200, {'Content-Type': ctype})

    if (ext === '.html') {
      const html = data.toString()
      const clientScript = `\n<script>/* live-reload client */\n(function(){if(typeof EventSource==='undefined')return;const es=new EventSource('/livereload');es.addEventListener('reload',function(){location.reload()});es.addEventListener('message',function(){location.reload()});console.log('live-reload connected');})();</script>\n`;
      const injected = html.replace(/<\/body>/i, match => clientScript + match)
      return res.end(injected)
    }

    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url, `http://localhost:${PORT}`)
  const pathname = decodeURIComponent(parsed.pathname)

  if (pathname === '/livereload') {
    // SSE endpoint
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    })
    res.write(':ok\n\n')
    clients.add(res)

    req.on('close', () => {
      clients.delete(res)
    })
    return
  }

  let filepath = path.join(publicDir, pathname)
  // if a directory or root, serve index.html
  fs.stat(filepath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      filepath = path.join(filepath, 'index.html')
    }

    // default to index.html when requesting '/'
    if (pathname === '/' || pathname === '') {
      filepath = path.join(publicDir, 'index.html')
    }

    // prevent path traversal
    if (!filepath.startsWith(publicDir)) {
      res.writeHead(400, {'Content-Type': 'text/plain'})
      return res.end('Bad request')
    }

    serveFile(req, res, filepath)
  })
})

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`)
  console.log(`Serving ${publicDir}`)
  console.log('SSE live-reload available at /livereload')
})

// Simple polling-based watcher (no extra deps) to detect changes under public/
function walkDir(dir, out) {
  const list = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of list) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      walkDir(full, out)
    } else if (ent.isFile()) {
      out.push(full)
    }
  }
}

let mtimes = new Map()
function scanFiles() {
  const files = []
  try { walkDir(publicDir, files) } catch (e) { return }
  let changed = false
  for (const f of files) {
    try {
      const s = fs.statSync(f)
      const prev = mtimes.get(f)
      const cur = s.mtimeMs
      if (!prev) mtimes.set(f, cur)
      else if (cur !== prev) {
        mtimes.set(f, cur)
        changed = true
      }
    } catch (e) { /* ignore */ }
  }
  if (changed) {
    console.log('Change detected in public/, sending reload')
    sendReload()
  }
}

// initial scan
try { scanFiles() } catch (e) { /* ignore */ }
setInterval(scanFiles, 400)
