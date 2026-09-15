import express, { type RequestHandler } from "express"
import authRoutes from "./routes/auth.ts"
import todoRoutes from "./routes/todo.ts"
import authMiddleware from "./middleware/auth.ts"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Routes
app.use('/auth', authRoutes)
app.use('/todos', authMiddleware, todoRoutes)

// If the link doesn't match any endpoint
const returnNotFound: RequestHandler = (req, res) => res.status(404).send('404 Not Found')
app.post(/.*/, returnNotFound)
app.put(/.*/, returnNotFound)
app.get(/.*/,  returnNotFound)
app.delete(/.*/, returnNotFound)

app.listen(PORT, () => {
    console.log(`Server opened on PORT ${PORT}`)
})