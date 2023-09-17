import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import photosRoutes from "./routes/photos.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", photosRoutes);

export default app;
