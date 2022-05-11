import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { tableUser } from "../database/tableUser";

export const loginUserService = (email, password) => {
  const findUser = tableUser.find((user) => user.email === email);

  if (!findUser) {
    return "Email or password invalid";
  }

  const comparePassword = bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    return "Email or password invalid";
  }

  const token = jwt.sign({ findUser }, "SECRET_KEY", { expiresIn: "1h" });

  return token;
};
