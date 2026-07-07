import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.ts"
import todoRoutes from "./routes/todo.ts"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, '../public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Routes
app.use('/auth', authRoutes)
app.use('/todos', todoRoutes)

// If the link doesn't match any endpoint
app.post(/.*/, (req, res) => res.status(404).send('Not Found'))
app.put(/.*/, (req, res) => res.status(404).send('Not Found'))
app.get(/.*/,  (req, res) => res.status(404).send('Not Found'))
app.delete(/.*/, (req, res) => res.status(404).send('Not Found'))

app.listen(PORT, () => {
    console.log(`Server opened on PORT ${PORT}`)
})