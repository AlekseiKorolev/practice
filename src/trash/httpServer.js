const http = require('http');
http.createServer((req, res) => {
    console.log('Connected....');
    res.write("Почему ты, свинина, сюда пишешь?");
    res.end();
}).listen(8080);
