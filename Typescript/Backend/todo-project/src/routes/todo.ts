import express from "express"
import db from "../db.ts"

import type { CustomRequestType } from "../utils/types.ts"

const router = express.Router()

// gets all todos
router.get('/', (req: CustomRequestType, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    // cast here was made because the middleware guarantees req.userId exists and is a number
    const todos = getTodos.all(req.userId as number)
    res.json(todos)
})

// creates a todo
router.post('/', (req: CustomRequestType, res) => {
    const { task } = req.body

    const insertTodo = db.prepare("INSERT INTO todos (user_id, task) VALUES (?, ?)")
    insertTodo.run(req.userId as number, task)

    res.status(201).json({ message: "Created" })
})

router.put('/:todoId', (req, res) => {
    const { todoId } = req.params

    const updateTodo = db.prepare("UPDATE todos SET completed = ? WHERE id = ?")
    // the only way you can update the todos is to
    // completing them, so no need to handle body info
    updateTodo.run(1, todoId)
    
    res.sendStatus(204)
})

router.delete('/:id', (req, res) => {

})

export default router