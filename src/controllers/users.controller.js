import { tableUser } from "../database/tableUser";
import {
  createdUserService,
  deletedUserService,
  getAllUserService,
  getUserByUuidService,
  updatedUserService,
} from "../services/users.service";

export const createdUserController = async (req, res) => {
  const user = req.body;

  const createdUser = await createdUserService(user);

  res.status(201).json(createdUser);
};

export const getAllUserController = (req, res) => {
  const getAllUsers = getAllUserService(req);

  if (!getAllUsers) {
    return res.status(401).json({ message: "Missing admin permissions" });
  }

  res.status(200).json(getAllUsers);
};

export const getUserByUuidController = (req, res) => {
  const token = req.headers.authorization;

  const userFind = getUserByUuidService(token);

  if (userFind) {
    return res.status(200).json(userFind);
  } else {
    return res.status(404).json({ error: "User uuid not found!" });
  }
};

export const updatedUserController = (req, res) => {
  const updatedUser = updatedUserService(req);

  if (!updatedUser) {
    return res.status(401).json({ message: "Missing admin permissions" });
  }

  return res.status(200).json(updatedUser);
};

export const deletedeUserController = (req, res) => {
  const { uuid } = req.params;
  const token = req.headers.authorization;

  const deletedUser = deletedUserService(uuid, token, res);

  if (!deletedUser) {
    return res.status(404).json({ error: "User uuid not found!" });
  } else {
    return res.status(200).json("");
  }
};
