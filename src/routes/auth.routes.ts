import { Router } from "express";

const router = Router();

router.post("/register", (_req, res) => res.send("hello"));
router.post("/login");
router.post("/logout");
router.get("/profile");

export default router;
