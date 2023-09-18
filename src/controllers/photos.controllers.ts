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

export const getPhoto = async (req: Request, res: Response) => {
  try {
    const [rows] = await dataBase.query<IPhotos[]>(
      "SELECT * FROM photos WHERE id = ?",
      [req.params.id]
    );
    const result = rows[0];
    res.status(200).json({
      id: result.id,
      title: result.title,
      photo: result.photo,
      created_at: result.created_at,
      updated_at: result.updated_at,
      user_id: result.user_id,
    });
  } catch (error) {
    res.status(400).json({ message: "Photo Not Found" });
  }
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
    res.status(400).json({ error: err.code });
  }
};

export const deletePhoto = async (req: Request, res: Response) => {
  try {
    const [result] = await dataBase.query<ResultSetHeader>(
      "DELETE FROM photos WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows !== 0) {
      res.sendStatus(204);
    } else {
      res.status(400).json({ message: "Photo Not found" });
    }
  } catch (error) {
    const err = error as QueryError;
    res.status(400).json({ error: err.code });
  }
};

export const updatePhoto = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const [result] = await dataBase.query<ResultSetHeader>(
      "UPDATE photos SET title = ? WHERE id = ?",
      [title, req.params.id]
    );

    if (result.affectedRows !== 0) {
      res.sendStatus(204);
    } else {
      res.status(400).json({ message: "Photo Not found" });
    }
  } catch (error) {
    const err = error as QueryError;
    res.status(400).json({ error: err.code });
  }
};
