// ========== importing http and url from node ======
const fs = require("fs");
const http = require("http");
const path = require("path");
const url = require("url");

///////////////////////////////////////////
// ===== Template Replace Function =======
const replaceTemplate = (tempCard, product) => {
  let output = tempCard.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }

  return output;
};

///////////////////////////////////////////
// ===== Reading Templates & Data ========
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

///////////////////////////////////////////
// ===== Creating Server =========
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  console.log("Query:", query);

  // ========= OVERVIEW PAGE ========
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const cardHtml = dataAPI
      .map((item) => replaceTemplate(product_card, item))
      .join("");

    const output = template_overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);

    res.end(output);
  }

  // ========= PRODUCT DETAILS PAGE ========
  else if (pathname === "/details") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const product = dataAPI[query.id];

    if (!product) {
      res.end("<h1>Product Not Found!</h1>");
      return;
    }

    const output = replaceTemplate(template_product, product);
    res.end(output);
  }

  // ========= API ROUTE ========
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(api);
  }

  // ========= 404 PAGE ========
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Oops! Page Not Found</h1>");
  }
});

///////////////////////////////////////////
// ===== Server Listen ========
server.listen(8000, "127.0.0.1", () => {
  console.log("Server is running on port 8000...");
});


