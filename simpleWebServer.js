// ========== importing http and url from node ======
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

///////////////////////////////////////////
// ===== FILE =========

///////////////////////////////////////////
// ===== SERVER =========

// ========== replace function =======
const replaceTemplate = (tempCard, product) => {
  let output = tempCard.replace(/{%ID%}/g, product.id);
  output = tempCard.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

  return output;
};

const template_overview = fs.readFileSync(
  `${__dirname}/template/template_overview.html`,
  "utf-8"
);
const template_product = fs.readFileSync(
  `${__dirname}/template/template_product.html`,
  "utf-8"
);
const product_card = fs.readFileSync(
  `${__dirname}/template/product_card.html`,
  "utf-8"
);
const api = fs.readFileSync(`${__dirname}/Data/data.json`, "utf-8");
const dataAPI = JSON.parse(api);
// console.log(dataAPI);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // =========OVERVIEW PAGE ========
  if (pathName === "/" || pathName === "/overview") {
    // res.end("Hello our first web server creating by node !");
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardHtml = dataAPI.map((item) => replaceTemplate(product_card, item));
    const output = template_overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);
    console.log(output);
    
    res.end(output);
  }
  // ========= product page  ========
  else if (pathName === "/product") {
    res.end("this is product page !");
  }
  // ========= product details page  ========
  else if (pathName === "/details") {
    res.end("this is details page !");
  }
  // ========= api  ========
  else if (pathName === "/api") {
    res.writeHead(202, {
      "Content-type": "application/json",
    });
    res.end(api);
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

console.log('salam from 87');

