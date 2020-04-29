const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "reports");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  let newReport = [];
  for (const file of files) {
    const fullPath = path.join(directoryPath, file);
    if (!fullPath.includes('html')) {
      const data = fs.readFileSync(fullPath, "utf8");
      newReport = newReport.concat(JSON.parse(data));
      fs.unlinkSync(fullPath);
    }
  }
  //   console.log(newReport)
  fs.writeFileSync("./reports/report.json", JSON.stringify(newReport));
  console.log("Done successfully!");
});

// fs.readFile('demofile1.html', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     res.end();
//   });

//   fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//     if (err) throw err;
//     console.log('Saved!');
//   });

//   fs.unlink('mynewfile2.txt', function (err) {
//     if (err) throw err;
//     console.log('File deleted!');
//   });
