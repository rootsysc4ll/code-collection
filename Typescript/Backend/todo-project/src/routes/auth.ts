import express from "express"
import bcrypt from "bcryptjs"
import jwt, { type Secret } from "jsonwebtoken"
import db from "../db.ts"

const hashSalt = 8
const router = express.Router()

router.post('/register', (req, res) => {
    const { username, password } = req.body
    
    const hashedPassword = bcrypt.hashSync(password, hashSalt)
    
    try {
        // sql query
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
        const result = insertUser.run(username, hashedPassword)

        // creating default todo
        const defaultTodoTask = "Hello! That's a default todo"
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)')
        insertTodo.run(result.lastInsertRowid, defaultTodoTask)

        // creating new token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET as Secret, { expiresIn: '24h' })
        res.send(token)
    } catch (err) {
        console.log(err)
        res.sendStatus(504)
    }

    res.sendStatus(201)
})

router.post('/login', (req, res) => {

})

export default router