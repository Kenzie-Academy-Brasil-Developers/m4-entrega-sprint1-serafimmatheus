import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { tableUser } from "../database/tableUser";
import jwt from "jsonwebtoken";
import { titleize } from "../utils/formatedNames.util";
import { getUserUtil } from "../utils/getUser.util";

export const createdUserService = async (user) => {
  const { email, name, password, isAdm } = user;

  const password_hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    email: email.toLowerCase(),
    name: titleize(name),
    password: password_hashed,
    isAdm,
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  tableUser.push(newUser);

  return newUser;
};

export const getAllUserService = ({ headers }) => {
  const tokenUserAuth = jwt.decode(headers.authorization);

  const userFindAdm = tableUser.find(
    (user) => user.id === tokenUserAuth.findUser.id
  );

  if (!userFindAdm.isAdm) {
    return false;
  }

  const newUsers = [];

  for (let i = 0; i < tableUser.length; i++) {
    const user = tableUser[i];
    const { password, ...usersList } = user;
    newUsers.push(usersList);
  }
  return newUsers;
};

export const getUserByUuidService = (token) => {
  const userAuth = jwt.decode(token);

  const userFind = tableUser.find((user) => user.id === userAuth.findUser.id);

  if (!userFind) {
    return false;
  }

  return userFind;
};

export const updatedUserService = ({ body, params, headers, user }) => {
  const userAuth = jwt.decode(headers.authorization);

  const findUserAuth = tableUser.find(
    (user) => user.id === userAuth.findUser.id
  );

  if (findUserAuth.isAdm) {
    Object.assign(user, body);
    return getUserUtil({ ...user, ...body });
  } else {
    return false;
  }
};

export const deletedUserService = (uuid, token, res) => {
  const userAuth = jwt.decode(token);

  const findUserAuth = tableUser.find((user) => user.id === uuid);

  if (findUserAuth.id === userAuth.findUser.id || userAuth.findUser.isAdm) {
    const userFindIndex = tableUser.findIndex((user) => user.id === uuid);

    if (userFindIndex === -1) {
      return res.status(404).json({ message: "User not found!" });
    }

    tableUser.splice(userFindIndex, 1);

    return res.status(201);
  }

  return res.status(401).json({ message: "Missing admin permissions" });
};
