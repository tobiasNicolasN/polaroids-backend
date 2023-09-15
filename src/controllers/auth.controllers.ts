import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import { dataBase } from "../db";
import { QueryError, ResultSetHeader } from "mysql2/promise";
import { createAccessToken } from "../libs/jwt";
import IUsers from "../models/users.models";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10);

    const [result] = await dataBase.query<ResultSetHeader>(
      `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
      [username, email, passwordHash]
    );

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

  try {
    const [rows] = await dataBase.query<IUsers[]>(
      `SELECT * FROM users WHERE email = ?;`,
      [email]
    );

    if (rows.length > 0) {
      const userFound = rows[0];

      const isMatch = await bcryptjs.compare(password, userFound.password!);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });

      const token = await createAccessToken({ id: userFound.id! });
      res.cookie("token", token);

      res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.created_at,
      });
    } else {
      return res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    const err = error as QueryError;
    res.status(500).json({ message: err.code });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};
