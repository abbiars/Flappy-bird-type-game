const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = process.env.PORT || 8080;

function contentTypeFromExt(ext) {
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'text/javascript; charset=utf-8';
    case '.mjs': return 'text/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    default: return 'application/octet-stream';
  }
}

http.createServer(function (req, res) {
  const q = url.parse(req.url, true);
  let filepath = path.join(__dirname, 'public', q.pathname);


  if (q.pathname === '/' || q.pathname === '') {
    filepath = path.join(__dirname, 'public', 'index.html');
  }


  if (!filepath.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(400, {'Content-Type': 'text/plain'});
    return res.end('Bad request');
  }

  fs.readFile(filepath, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('404 Not Found');
    }
    const ext = path.extname(filepath).toLowerCase();
    const ctype = contentTypeFromExt(ext);
    res.writeHead(200, {'Content-Type': ctype});
    res.end(data);
  });
}).listen(port, () => {
    console.log
  console.log(`Server listening on http://localhost:${port}`);
});
