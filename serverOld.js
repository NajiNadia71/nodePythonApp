const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3020;

const serverOld = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    } else {
        fs.readFile('form_tosend.html', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
});

serverOld.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});