// ========== importing http and url from node ======
const http = require("http");
const url = require("url");

///////////////////////////////////////////
// ===== FILE =========

///////////////////////////////////////////
// ===== SERVER =========
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.end("Hello our first web server creating by node !");
  } else if (pathName === "/product") {
    res.end("this is product page !");
  } else if (pathName === "/details") {
    res.end("this is details page !");
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>Ofs ! page not found !</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening from server !");
});

