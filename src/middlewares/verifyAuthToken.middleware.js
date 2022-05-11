import jwt from "jsonwebtoken";

export const verifyAuthTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization Token." });
  }

  jwt.verify(token, "SECRET_KEY", (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Invalid Token." });
    }

    next();
  });
};
