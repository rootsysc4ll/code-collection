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
    
    res.status(204).json({ message: "Updated" })
})

router.delete('/:todoId', (req: CustomRequestType, res) => {
    const { todoId } = req.params as { todoId: string }
    const userId = req.userId as number
    
    const deleteTodo = db.prepare("DELETE FROM todos WHERE id = ? AND user_id = ?")
    deleteTodo.run(todoId, userId)

    res.status(200).json({ message: "Deleted" })
})

router.delete("/", (req: CustomRequestType, res) => {
    const userId = req.userId as number

    const resetTodos = db.prepare("DELETE FROM todos WHERE user_id = ?")
    resetTodos.run(userId)

    res.status(200).json({ message: "Deleted" })
})

export default router