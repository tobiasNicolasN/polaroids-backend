import { Router } from "express";
import { authRequired } from "../middlewares/validateToken";
import {
  deletePhoto,
  getPhoto,
  getPhotos,
  postPhoto,
  updatePhoto,
} from "../controllers/photos.controllers";

const router = Router();

router.post("/photos", authRequired, postPhoto);
router.get("/photos", authRequired, getPhotos);
router.get("/photos/:id", authRequired, getPhoto);
router.delete("/photos/:id", authRequired, deletePhoto);
router.patch("/photos/:id", authRequired, updatePhoto);

export default router;
