// ========== importing http and url from node ======
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./module/replaceTemplate');
const { log } = require('console');

///////////////////////////////////////////
// ===== Reading Templates & Data ========
const template_overview = fs.readFileSync(
  `${__dirname}/template/template_overview.html`,
  'utf-8'
);

const template_product = fs.readFileSync(
  `${__dirname}/template/template_product.html`,
  'utf-8'
);

const product_card = fs.readFileSync(
  `${__dirname}/template/product_card.html`,
  'utf-8'
);

const api = fs.readFileSync(`${__dirname}/Data/data.json`, 'utf-8');
const dataAPI = JSON.parse(api);

// ======== making slug ===========
const slugs = dataAPI.map(item => slugify(item.productName, { lower: true }));
console.log(slugs);

///////////////////////////////////////////
// ===== Creating Server =========
const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // ========= OVERVIEW PAGE ========
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const cardHtml = dataAPI
      .map(item => replaceTemplate(product_card, item))
      .join('');

    const output = template_overview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);

    res.end(output);
  }

  // ========= PRODUCT  PAGE ========
  else if (pathname === `/product`) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const product = dataAPI[query.id];

    if (!product) {
      res.end('<h1>Product Not Found!</h1>');
      return;
    }

    const output = replaceTemplate(template_product, product);
    res.end(output);
  }

  // ========= API ROUTE ========
  else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(api);
  }

  // ========= 404 PAGE ========
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Oops! Page Not Found</h1>');
  }
});

///////////////////////////////////////////
// ===== Server Listen ========
server.listen(8000, '127.0.0.1', () => {
  console.log('Server is running on port 8000...');
});
