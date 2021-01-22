const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "")));

app.use(require("./src/route"));

app.listen(port, () => {
  console.log(`Server in port ${port}`);
});
