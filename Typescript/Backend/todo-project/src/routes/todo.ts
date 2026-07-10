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

router.post('/', (req, res) => {
    
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

export default router