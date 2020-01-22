const jwt = require("jsonwebtoken");

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const secret =
        process.env.JWT_SECRET || "Something something, funny funny";
      const decoded = jwt.verify(token, secrets.jwt);

      // what is subject? decoded.subject missing some stuff here, need to look into it.
      req.userId = decoded.subject;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid" });
    }
  };
};
