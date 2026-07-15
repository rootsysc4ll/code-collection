import fs from "fs"

// the .env needs to be generated because not changing the secret jwt key
// can cause authentication issues
fs.writeFileSync(".env", `JWT_SECRET="${crypto.randomUUID()}"\nPORT=8000`)

const dbPath = './:memory'
const dbExists = fs.existsSync(dbPath)

if (dbExists) {
    fs.unlinkSync(dbPath)
    console.log('Database deleted')
}