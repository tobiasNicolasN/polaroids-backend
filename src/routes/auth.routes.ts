import { Router } from "express";
import { dataBase } from "../db";

const router = Router();

router.get("/test", async (_req, res) => {
  const test = await dataBase.query("SELECT 1 + 1 AS result");
  res.json(test);
});
router.post("/register");
router.post("/login");
router.post("/logout");
router.get("/profile");

export default router;
