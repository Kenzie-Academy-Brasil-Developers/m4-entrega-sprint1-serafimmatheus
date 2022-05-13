import { tableUser } from "../database/tableUser";

export const getUserByUuidMiddleware = (req, res, next) => {
  const userFind = tableUser.find((user) => user.id === req.params.uuid);

  if (!userFind) {
    return res.status(404).json({ message: "User not found!" });
  }

  req.user = userFind;

  return next();
};
