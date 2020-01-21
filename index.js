const express = require("express");
const dbConfig = require("./data/dbConfig");
const port = process.env.PORT || 5000;

const server = express();
server.use(express.json());

server.get("/", (req, res, next) => {
  res.json({ message: "Welcome" });
});

server.use((err, req, res, next) => {
  console.log("error", err);

  res.status(500).json({ message: "Something went wrong" });
});

server.listen(port, () => {
  console.log(` Server running on ${port}.`);
});

module.exports = server;
