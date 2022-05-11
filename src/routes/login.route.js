import { Router } from "express";
import { loginUserController } from "../controllers/login.controller";

export const router = Router();

router.post("", loginUserController);
