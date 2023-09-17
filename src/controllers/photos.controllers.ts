import {Request, Response} from 'express'

export const postPhoto = (_req: Request, res: Response) => { res.json({m: "1"})}
export const getPhoto = (_req: Request, res: Response) => { res.json({m: "2"})}
export const getPhotos = (_req: Request, res: Response) => { res.json({m: "3"})}
export const deletePhoto = (_req: Request, res: Response) => { res.json({m: "4"})}
export const updatePhoto = (_req: Request, res: Response) => { res.json({m: "5"})}
