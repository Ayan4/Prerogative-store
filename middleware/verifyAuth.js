const jwt = require("jsonwebtoken");

exports.authToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Unauthorized Access" });
  }
};
