const express = require("express");
const port = process.env.PORT || 5000;
const userRouter = require("./api/users/user-router.js");

const server = express();
server.use(express.json());
server.use("/api/", userRouter);

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
