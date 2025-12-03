// ======= file system from node ==========
const { log } = require("console");
const fs = require("fs");

// =========== read files =======
const readFiles1 = fs.readFileSync("text.txt", "utf-8");
const readFiles2 = fs.readFileSync("text2.txt", "utf-8");
const readFiles3 = fs.readFileSync("text3.txt", "utf-8");
// console.log(readFiles1, readFiles2, readFiles3);

// =========== read file synchronously : 1 ===========
const readFilsSync = fs.readFileSync("text.txt", "utf-8");
// console.log(readFilsSync);
// console.log("This is synchronous !");

// =========== read file asynchronously ===========
// fs.readFile("text2.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("This is asynchronous !");

// =========== read file asynchronously with callback function ===========
fs.readFile("text.txt", "utf-8", (err, data1) => {
  console.log(data1);

  fs.readFile("text2.txt", "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile("text3.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.readFile("text4.txt", "utf-8", (err, data4) => {
        console.log(data4);

        fs.readFile("text5.txt", "utf-8", (err, data5) => {
          console.log(data5);

          fs.readFile("text6.txt", "utf-8", (err, data6) => {
            console.log(data6);

            fs.readFile("text7.txt", "utf-8", (err, data7) => {
              console.log(data7);

              fs.readFile("text8.txt", "utf-8", (err, data8) => {
                console.log(data8);

                fs.readFile("text9.txt", "utf-8", (err, data9) => {
                  console.log(data9);

                  fs.readFile("text10.txt", "utf-8", (err, data10) => {
                    console.log(data10);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// ============= write file here ============
// ==== txt file ===
const fileName = `writeFile1`;
const fileContent = `This is a text of ${fileName} \n${new Date().toDateString()}`;
fs.writeFileSync(`./${fileName}.txt`, fileContent);
// console.log(fileName + " has been created");

// ==== html file ===
const fileName2 = `writeFile2`;
const fileContent2 = `<p>This is a text of ${fileName2}</p>\n<p>${new Date().toDateString()}</p>`;
fs.writeFileSync(`./${fileName2}.html`, fileContent2);
// console.log(fileName2 + " has been created");

// ==== js file ===
const fileName3 = `writeFile3`;
const fileContent3 = `const fileText = "here is text of file 03"`;
fs.writeFileSync(`./${fileName3}.js`, fileContent3);
// console.log(fileName3 + " has been created");
