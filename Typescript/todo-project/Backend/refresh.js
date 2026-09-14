import fs from "fs"

// the .env needs to be generated because not changing the secret jwt key
// can cause authentication issues

const dbPath = "database.db"
const dbExists = fs.existsSync(dbPath)

if (dbExists) {
    fs.unlinkSync(dbPath)
} 

fs.writeFileSync(".env", `
DB_PATH="${dbPath}"
JWT_SECRET="${crypto.randomUUID()}"
PORT=8000
`)

