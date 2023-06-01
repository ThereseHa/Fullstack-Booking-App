import { config } from 'dotenv'
import pkg from 'pg'
const { Client } = pkg

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

// Dotenv
config()

// Middlewares
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.use(cors())
app.use(express.json())
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})

// Implementerar databasen
const client = new Client({
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    user: process.env.USER
})

client.connect(function (err) {
    if (err) throw err
    console.log('Database Connected')
})

//Rutterna
app.get('/', (req, res) => {
    res.json('Hejsan')
})

app.get('/persons', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM users')
        res.json(result.rows)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

//Persons Post
app.post('/persons', async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    try {
        await client.query(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            [first_name, last_name, email, password]
        )
        res.sendStatus(201)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

// Login POST
app.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        // Query the database to check if email and password match
        const result = await client.query(
            'SELECT * FROM users WHERE email = $1 AND password = $2',
            [email, password]
        )

        if (result.rows.length > 0) {
            const userId = result.rows[0].user_id
            res.status(200).json({ userId })
        } else {
            res.sendStatus(401)
        }
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

// Registrera POST
app.post('/register', async (req, res) => {
    const { FirstName, LastName, email, password } = req.body

    //Check if inputs are empty
    if (!FirstName || !LastName || !email || !password) {
        return res.sendStatus(400) // Bad Request
    }

    const values = [FirstName, LastName, email, password]

    try {
        await client.query(
            'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)',
            values
        )
        res.status(201).send('Konto skapad')
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

app.listen(8800, () => {
    console.log('Server is running')
})
