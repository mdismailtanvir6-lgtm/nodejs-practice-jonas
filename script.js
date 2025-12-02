const hello = "hello world !";
console.log(hello);
console.log("Hello from Node!");


const fs = require("fs");
const readFiles = fs.readFileSync("text.txt", "utf-8");
console.log(readFiles);
