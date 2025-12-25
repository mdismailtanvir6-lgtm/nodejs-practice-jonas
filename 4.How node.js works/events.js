const http = require('http');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

myEmitter.on('newSale', () => {
  console.log('This is a new sale');
});

myEmitter.on('newSale', () => {
  console.log('This is a new customer');
});

myEmitter.on('newSale', (stock, weight) => {
  console.log(
    `there was ${stock} item in product list. and the weight of product is : ${weight}`
  );
});

myEmitter.emit('newSale', 10, '20kg');

// =========== server request and response ===========

// ====== server request  =======
const server = http.createServer();
server.on('request', (req, res) => {
  console.log('Request received !');
  console.log(req.url);
  res.end('Request recieved here on browser.');
});


// ======= server  response =======
server.listen(5000, '127.0.0.1', () => {
  console.log('server running on local host...');
});
