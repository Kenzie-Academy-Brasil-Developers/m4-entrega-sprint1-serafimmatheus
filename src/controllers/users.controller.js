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

export const getAllUserController = (_, res) => {
  const getAllUsers = getAllUserService();

  res.status(200).json(getAllUsers);
};

export const getUserByUuidController = (req, res) => {
  const { uuid } = req.params;

  const userFind = getUserByUuidService(uuid);

  if (userFind) {
    return res.status(200).json(userFind);
  } else {
    return res.status(404).json({ error: "User uuid not found!" });
  }
};

export const updatedUserController = (req, res) => {
  const { uuid } = req.params;
  const { email, name, isAdm } = req.body;

  const updatedUser = updatedUserService(uuid, email, name, isAdm);

  if (updatedUser) {
    return res.status(200).json(updatedUser);
  } else {
    return res.status(404).json({ error: "User uuid not found!" });
  }
};

export const deletedeUserController = (req, res) => {
  const { uuid } = req.params;

  const deletedUser = deletedUserService(uuid);

  if (!deletedUser) {
    return res.status(404).json({ error: "User uuid not found!" });
  } else {
    return res.status(200).json("");
  }
};
