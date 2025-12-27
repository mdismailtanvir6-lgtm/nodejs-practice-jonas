// ========== importing modules ==========
const fs = require('fs');
const path = require('path');
const server = require('http').createServer();

// ============ server request ==========
server.on('request', (req, res) => {
  const filePath = path.join(__dirname, 'textfile.txt');

  // ==== solition 01 : fs reading without streams ======
  // fs.readFile(filePath, (err, data) => {
  //   if (err) {
  //     console.log('error from fs read file without streams');
  //     return;
  //   }
  //   res.end(data);
  // });

  // ==== solition 02 : fs reading with streams =========
  // const readableStream = fs.createReadStream(filePath);
  // readableStream.on('data', chunk => {
  //   res.write(chunk);
  // });
  // readableStream.on('end', () => {
  //   res.end();
  // });
  // readableStream.on('error', err => {
  //   console.log('error from fs with stream ');
  //   res.statusCode = 500;
  //   res.end('error from fs with stream ');
  // });

  // ==== solition 03 : (best) =========
  const readableStream = fs.createReadStream(filePath);
  // readableStream.pipe(res);
  // readableStream.on('error', err => {
  //   console.log('error from fs with stream ');
  //   res.statusCode = 500;
  //   res.end('error from fs with stream ');
  // });

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // stream error handling
  readableStream.on('error', err => {
    console.error('Stream error:', err.message);

    res.statusCode = 500;
    res.end('File read error');
  });

  // pipe stream to response
  readableStream.pipe(res);
});

// =========== server listen =============
server.listen(8000, '127.0.0.1', () => {
  console.log('server running on local host...');
});
