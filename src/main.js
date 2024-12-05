const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

/* Middlewares */
const staticPath = path.join(__dirname, "..", "static");
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.text());

/* Routes handlers */
app.get("/", (req, res) => {
  res.json(req.query);
});

app.post("/", (req, res) => {
  res.send(req.body);
});

/* 404 */
app.get("*", (req, res) => {
  res.sendFile("404.jpg", { root: staticPath });
});

app.post("*", (req, res) => {
  if (req.get("Content-Type") === "application/json") {
    res.json({ error: "404" });
  }

  res.sendFile("404.jpg", { root: staticPath });
});

/* Start server */
const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
