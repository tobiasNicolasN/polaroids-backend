import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";

export const createAccessToken = (payload: { id: Number }) => {
  return new Promise((resolve, rejects) => {
    jwt.sign(
      payload,
      TOKEN_SECRET || "tokenDefault",
      { expiresIn: "1d" },
      (error, token) => {
        if (error) rejects(error);
        resolve(token);
      }
    );
  });
};
