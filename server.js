const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { readFileSync } = require("fs");
const { sendMail } = require("./serviceEmail");

function readFile(path) {
  const data = readFileSync(path);
  return JSON.parse(data.toString());
}

app.get("/", async (req, res, next) => {
  const list_email = readFile('./data.json').list_email;
  list_email.forEach(e => {
      sendMail(e)
  });
  res.json("email sent !");
});

app.listen(port, () => {
  console.log(`server ready at port ${port} `);
});
