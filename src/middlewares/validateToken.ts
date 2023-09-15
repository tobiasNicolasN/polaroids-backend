import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

interface IJwt extends JwtPayload {
  id?: Number;
}

declare module "express" {
  interface Request {
    user?: IJwt;
  }
}

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  const decoded = jwt.verify(token, TOKEN_SECRET!);
  req.user = decoded as IJwt;

  next();
};
