import { Router } from "express";
import {
  createdUserController,
  getAllUserController,
  getUserByUuidController,
  updatedUserController,
  deletedeUserController,
} from "../controllers/users.controller";
import { verifyEmailAlreadyExistsMiddleware } from "../middlewares/verifyEmailAlreadyExists.middleware";
import { verifyAuthTokenMiddleware } from "../middlewares/verifyAuthToken.middleware";
import { getUserByUuidMiddleware } from "../middlewares/getUserByUuid.middleware";

export const router = Router();

router.get("", verifyAuthTokenMiddleware, getAllUserController);
router.get("/profile", verifyAuthTokenMiddleware, getUserByUuidController);
router.post("", verifyEmailAlreadyExistsMiddleware, createdUserController);
router.patch(
  "/:uuid",
  getUserByUuidMiddleware,
  verifyAuthTokenMiddleware,
  updatedUserController
);
router.delete("/:uuid", verifyAuthTokenMiddleware, deletedeUserController);
