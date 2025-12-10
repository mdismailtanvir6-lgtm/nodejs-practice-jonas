// ========== importing http and url from node ======
const fs = require("fs");
const http = require("http");
const url = require("url");

///////////////////////////////////////////
// ===== FILE =========

///////////////////////////////////////////
// ===== SERVER =========
const data = fs.readFileSync(`${__dirname}/Data/data.json`, "utf-8");
// const dataAPI = JSON.parse(data);
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.end("Hello our first web server creating by node !");
  } else if (pathName === "/product") {
    res.end("this is product page !");
  } else if (pathName === "/details") {
    res.end("this is details page !");
  } else if (pathName === "/api") {
    res.writeHead(202, {
      "Content-type": "application/json",
    });
    res.end(data);
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
