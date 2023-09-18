import { Request, Response } from "express";
import { dataBase } from "../db";
import { QueryError, ResultSetHeader } from "mysql2";
import IPhotos from "../models/photos.models";

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

export const getPhotos = async (req: Request, res: Response) => {
  try {
    const [rows] = await dataBase.query<IPhotos[]>(
      "SELECT * FROM photos WHERE user_id = ?",
      [req.user?.id]
    );

    res.status(200).json({ photos: rows });
  } catch (error) {
    const err = error as QueryError;
    res.status(400).json({ m: err.code });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  const [result] = await dataBase.query<ResultSetHeader>(
    "DELETE FROM photos WHERE id = ?",
    [req.params.id]
  );

  if (result.affectedRows !== 0) {
    res.sendStatus(204);
  } else {
    res.status(400).json({ message: "Photo Not found" });
  }
};

export const updatePhoto = (_req: Request, res: Response) => {
  res.json({ m: "5" });
};
