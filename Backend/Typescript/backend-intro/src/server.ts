import express from "express"

type DataType = {
    id: string
    name: string
    age: number
    registered: boolean
}

const data: DataType[] = [{
    id: crypto.randomUUID(),
    name: 'sfdgjjgs',
    age: 12,
    registered: false
}]

const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

//website endpoints
app.get('/', (req, res) => {
    console.log('Hit endpoint / with method', req.method)
    res.send(`
        <h1>This is the main page</h1>
        <h1>DATA:</h1>
        <p>${JSON.stringify(data)}</p>
    `)
})

app.get('/something', (req, res) => {
    console.log('Hit endpoint /something with method', req.method)
    res.send('<h1>This is the something page</h1>')
})

// api endpoints
app.get('/api/data', (req, res) => {
    console.log('Hit endpoint /api/data with method', req.method)
    res.send(data)
})

app.post('/api/data', (req, res) => {
    console.log('Hit endpoint /api/data with method', req.method)
    console.log(req.body)

    const { name, age, registered } = req.body

    if (typeof name === 'string' && typeof age === 'number' && typeof registered === 'boolean') {
        const newData = {
            id: crypto.randomUUID(),
            name,
            age,
            registered
        }
        data.push(newData)
        res.status(201).send('POST request successful!')
    } else {
        res.status(500).send("POST object doesn't match the backend object")
    }
})

app.put('/api/data/registered', (req, res) => {
    console.log('Hit endpoint /api/data/registered with method', req.method)
    console.log(req.body)

    const { id, value } = req.body
    if (typeof id === 'string' && typeof value === 'boolean') {
        for (const dataObj of data) {
            if (dataObj.id === id) {
                dataObj.registered = value
                break;
            }
        }
        res.status(201).send("PUT request successful!")
    } else {
        res.status(500).send("PUT request object doesn't match api requirement!")
    }
})

app.delete('/api/data', (req, res) => {
    console.log('Hit endpoint /api/data with method', req.method)
    data.pop()
    res.status(200).send("Deletion succeded!")
})



app.listen(PORT, () => {
    console.log(`opened server on port ${PORT}`)
})