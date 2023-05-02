const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const hostname = 'localhost';
const port = 3020;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('I Came Here');
        debugger;
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log(body);;
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

server.listen(port, hostname, () => {
    // console.log(Server running at http://${hostname}:${port}/);
});