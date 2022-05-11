import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcryptjs";
import { tableUser } from "../database/tableUser";

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

const titleize = (text) => {
  let words = text.toLowerCase().split(" ");
  for (let a = 0; a < words.length; a++) {
    let w = words[a];
    words[a] = w[0].toUpperCase() + w.slice(1);
  }
  return words.join(" ");
};

export const getAllUserService = () => {
  const newUsers = [];

  for (let i = 0; i < tableUser.length; i++) {
    const user = tableUser[i];
    const { password, ...usersList } = user;
    newUsers.push(usersList);
  }
  return newUsers;
};

export const getUserByUuidService = (uuid) => {
  const userFind = tableUser.find((user) => user.id === uuid);

  if (!userFind) {
    return false;
  }

  return userFind;
};

export const updatedUserService = (uuid, email, name, isAdm) => {
  const findUserIndex = tableUser.findIndex((user) => user.id === uuid);

  if (findUserIndex === -1) {
    return false;
  }

  const userUpdate = {
    email: email.toLowerCase(),
    name: titleize(name),
    isAdm,
    updatedOn: new Date(),
  };

  tableUser[findUserIndex] = { ...tableUser[findUserIndex], ...userUpdate };

  return tableUser[findUserIndex];
};

export const deletedUserService = (uuid) => {
  const userFindIndex = tableUser.findIndex((user) => user.id === uuid);

  if (userFindIndex === -1) {
    return false;
  }

  tableUser.splice(userFindIndex, 1);

  return true;
};
