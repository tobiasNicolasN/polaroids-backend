import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { dataBase } from "../db";
import { OkPacket, OkPacketParams } from "mysql2";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);

    const [rows] = await dataBase.query(
      `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
      [username, email, passwordHash]
    );
    const result = rows as OkPacket;

    res.status(200).json({
      id: result.insertId,
      username: username,
      email: email,
      password: passwordHash,
    });
  } catch (error) {
    res.status(404);
    console.log(error);
  }
};
