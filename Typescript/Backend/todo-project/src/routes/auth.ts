import express from "express"
import bcrypt from "bcryptjs"
import jwt, { type Secret } from "jsonwebtoken"
import db from "../db.ts" 

import type { AuthenticationBodyType, UserDBType } from "../utils/types.ts"

const hashSalt = 8
const router = express.Router()

router.post('/register', (req, res) => {
    const { username, password } = req.body as AuthenticationBodyType
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
        res.json({ token })
    } catch (err) {
        console.log(err)
        res.sendStatus(504)
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body as AuthenticationBodyType
    
    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username) as unknown as UserDBType
        const userId = user.id

        // checks if user is registered
        if (!user) {return res.status(404).send({ message: 'User not Found' })}

        // checks if password is valid
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) return res.status(401).send({ message: 'Invalid Password' })

        // login successful, regenerate token
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as Secret, { expiresIn: '24h' })
        res.json({ token, userId })
    } catch (err) {
        console.log(err)
        res.sendStatus(504)
    }
})

export default router