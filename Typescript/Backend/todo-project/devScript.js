import fs from "fs"

const dbPath = './:memory'
const dbExists = fs.existsSync(dbPath)

if (dbExists) {
    fs.unlinkSync(dbPath)
    console.log('Database deleted')
}