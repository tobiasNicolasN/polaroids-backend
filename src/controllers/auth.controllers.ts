import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { dataBase } from "../db";
<<<<<<< HEAD
import { QueryError, ResultSetHeader, RowDataPacket } from "mysql2";
=======
import { OkPacket, QueryError } from "mysql2";
>>>>>>> 7445faf84fbc80aa5aeceb588391c296498f7f9f
import { createAccessToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);

    const [rows] = await dataBase.query(
      `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
      [username, email, passwordHash]
    );
<<<<<<< HEAD
    const result = rows as ResultSetHeader;
=======
    const result = rows as OkPacket;
>>>>>>> 7445faf84fbc80aa5aeceb588391c296498f7f9f
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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const [userFound] = await dataBase.query(
    `SELECT email, password FROM users WHERE email = ?;`,
    [email]
  );

  const user = userFound as RowDataPacket;

  res.json({ user });
};
