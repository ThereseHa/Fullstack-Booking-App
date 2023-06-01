import { config } from 'dotenv'
import pkg from 'pg'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const { Client } = pkg

const app = express()

// Dotenv
config()

// Middlewares
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

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

client.connect((err) => {
    if (err) throw err
    console.log('Database Connected')
})

// Hjälpfunktion för att generera alla tider för ett givet datum
const generateAllTimesForDate = (date) => {
    const startTime = new Date(date).setHours(8, 0, 0) // Starttid: 08:00
    const endTime = new Date(date).setHours(22, 0, 0) // Sluttid: 22:00
    const allTimes = []
    let currentTime = startTime
    while (currentTime <= endTime) {
        const timeString = new Date(currentTime).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        })
        allTimes.push(timeString)
        currentTime += 60 * 60 * 1000 // Lägg till en timme
    }
    return allTimes
}

// GET-rutt för att hämta de tillgängliga tiderna baserat på ett angivet datum
app.get('/available-times', async (req, res) => {
    const { date } = req.query // Hämta 'date' från förfrågningsparametrarna
    const selectedDateTime = new Date(date)
    try {
        const result = await client.query(
            'SELECT * FROM bookings WHERE booking_date::date = $1::date',
            [selectedDateTime]
        )
        const bookedTimes = result.rows.map((booking) => booking.booking_date)
        const allTimes = generateAllTimesForDate(selectedDateTime)
        const availableTimes = allTimes.filter(
            (time) => !bookedTimes.includes(time)
        )
        res.json({ availableTimes, bookedTimes })
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
})

// POST-rutt för att registrera bokningar
app.post('/bookings', async (req, res) => {
    const { dateTime } = req.body
    const selectedDateTime = new Date(dateTime)
    try {
        await client.query('INSERT INTO bookings (booking_date) VALUES ($1)', [
            selectedDateTime
        ])
        res.sendStatus(200)
    } catch (error) {
        if (error.code === '23505') {
            // Felkod för unik nyckelbegränsning
            res.status(409).json({ error: 'Datum och tid är redan bokade.' })
        } else {
            console.error(error)
            res.sendStatus(500)
        }
    }
})

// GET-rutt för att hämta alla bokningar
app.get('/bookings', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM bookings')
        const bookings = result.rows
        res.json(bookings)
    } catch (error) {
        console.error(error)
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

// DELETE-rutt för att ta bort en bokning
app.delete('/bookings', async (req, res) => {
    const { dateTime } = req.body
    const selectedDateTime = new Date(dateTime)

    try {
        await client.query('DELETE FROM bookings WHERE booking_date = $1', [
            selectedDateTime
        ])
        res.sendStatus(200)
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

//Post kontaktformulär 
app.post("/contact", async (req, res) => {
  const { message } = req.body;
  try {
    await client.query(
      "INSERT INTO error_report (message) VALUES ($1)",
      [message]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(8800, () => {
    console.log('Server is running')
})
