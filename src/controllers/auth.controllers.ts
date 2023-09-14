import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { dataBase } from "../db";
import { OkPacket, QueryError } from "mysql2";
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);

    const [rows] = await dataBase.query(
      `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
      [username, email, passwordHash]
    );
    const result = rows as OkPacket;
    const token = await createAccessToken({ id: result.insertId });

    res.cookie("token", token);
    res.status(200).json({
      id: result.insertId,
      username: username,
      email: email,
      password: passwordHash,
    });
  } catch (error) {
    const err = error as QueryError;
    res.status(400).json({ message: err.code });
  }
};
