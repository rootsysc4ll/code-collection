import { DatabaseSync } from "node:sqlite"
import fs from "fs"

const dbPath = process.env.DB_PATH as string
const dbExists = fs.existsSync(dbPath)
const db = new DatabaseSync(dbPath)

if (!dbExists) {
    db.exec(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )    
    `)

    db.exec(`
        CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            task TEXT,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )    
    `)
} else {
    console.log("Database already exists, default behaviour is opening it")
}

export default db