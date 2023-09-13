import {Request, Response} from 'express'
import bcryptjs from 'bcryptjs'
import { dataBase } from '../db'

export const register = async (req: Request,res: Response) => {
    const {username, email, password} = req.body

    try {
        const passwordHash = await bcryptjs.hash(password, 10)

        const [rows] = await dataBase.query(`INSERT INTO users(username, email, password) VALUES (?, ?, ?)`, [username, email, passwordHash])

        res.status(200).json({id: "fixThis", username: username, email: email, password: passwordHash})
    }
    catch (error) {
        res.status(404)
        console.log(error)
    }
}