import express from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
console.log(__filename)
const __dirname = dirname(__filename)
console.log(__dirname)

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server opened on PORT ${PORT}`)
})