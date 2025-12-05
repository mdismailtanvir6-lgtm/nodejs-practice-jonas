// ========== importing http from node ======
const http = require("http");


///////////////////////////////////////////
// ===== FILE =========



///////////////////////////////////////////
// ===== SERVER =========
const server = http.createServer((req, res)=>{
    res.end("Hello our first web server creating by node !");
})


server.listen(8000, "127.0.0.1", ()=>{
    console.log("listening from server !");
})