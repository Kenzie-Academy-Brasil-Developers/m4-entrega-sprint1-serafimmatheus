import jwt from "jsonwebtoken";

export const verifyIsAdmMiddleware = (req, res, next) => {
  const { user, headers, decoded } = req;

  const userAuth = jwt.decode(headers.authorization);

  //   console.log(userAuth);

  if (!userAuth.findUser.isAdm) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  return next();
};
