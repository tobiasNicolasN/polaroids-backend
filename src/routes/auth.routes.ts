import { Router } from "express";
import { dataBase } from "../db";
import { login, logout, register } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile");

export default router;
