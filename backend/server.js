import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './src/config/db.js'
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import meetingsRoutes from './src/routes/meetingsRoutes.js'
import eventsRoutes from './src/routes/eventsRoutes.js'

import { errorHandler, notFound } from './src/middleware/errorMiddleware.js'

dotenv.config()

// connect to database
connectDB()

const app = express()

// CORS on ExpressJS
app.use(function (req, res, next) {
    // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Authorization, Accept'
    )
    next()
})

// Body parser
app.use(express.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/meetings', meetingsRoutes)

// deployment configuration
const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}

// Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
            .yellow.bold
    )
)
