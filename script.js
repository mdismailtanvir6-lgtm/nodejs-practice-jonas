const hello = "hello world !";
console.log(hello);
console.log("Hello from Node!");


const fs = require("fs");
const readFiles1 = fs.readFileSync("text.txt", "utf-8");
console.log(readFiles1);
const readFiles2 = fs.readFileSync("text2.txt", "utf-8");
console.log(readFiles2);
const readFiles3 = fs.readFileSync("text3.txt", "utf-8");
console.log(readFiles3);
