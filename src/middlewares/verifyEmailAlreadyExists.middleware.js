import { tableUser } from "../database/tableUser";

export const verifyEmailAlreadyExistsMiddleware = (req, res, next) => {
  const { email } = req.body;

  const emailAlreadyExists = tableUser.find(
    (user) => user.email === email.toLowerCase()
  );

  if (emailAlreadyExists) {
    return res.status(409).json({ message: "E-mail already registered" });
  }

  return next();
};
