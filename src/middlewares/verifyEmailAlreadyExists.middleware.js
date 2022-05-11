import { tableUser } from "../database/tableUser";

export const verifyEmailAlreadyExistsMiddleware = (req, res, next) => {
  const { email } = req.body;

  const emailAlreadyExists = tableUser.find((user) => user.email === email);

  if (emailAlreadyExists) {
    return res.status(409).json({ error: "Email already exists!" });
  }

  next();
};
