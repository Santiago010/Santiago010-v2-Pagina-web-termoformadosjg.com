const express = require("express");
const app = express();
const path = require("path");

app.set("port", process.env.PORT || 3000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "")));

app.use(require("./src/route"));

app.listen(app.get("port"), () => {
  console.log(`Server in port ${app.get("port")}`);
});
