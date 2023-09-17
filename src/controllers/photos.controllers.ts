import { Request, Response } from "express";
import { dataBase } from "../db";
import { QueryError, ResultSetHeader } from "mysql2";

export const postPhoto = async (req: Request, res: Response) => {
  const { title, photo } = req.body;

  try {
    const [result] = await dataBase.query<ResultSetHeader>(
      "INSERT INTO photos(title, photo, user_id) VALUES(?, ?, ?)",
      [title, photo, req.user?.id]
    );

    res.status(200).json({
      id: result.insertId,
      title: title,
      user_id: req.user?.id,
    });
  } catch (error) {
    const err = error as QueryError;
    res.status(400).json({ error: err.code });
  }
};

export const getPhoto = (_req: Request, res: Response) => {
  res.json({ m: "2" });
};

export const getPhotos = (_req: Request, res: Response) => {
  res.json({ m: "3" });
};

export const deletePhoto = (_req: Request, res: Response) => {
  res.json({ m: "4" });
};

export const updatePhoto = (_req: Request, res: Response) => {
  res.json({ m: "5" });
};
