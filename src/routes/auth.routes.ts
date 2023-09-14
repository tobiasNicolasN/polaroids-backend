import { Router } from "express";
import { dataBase } from "../db";
import { login, register } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout");
router.get("/profile");

export default router;
