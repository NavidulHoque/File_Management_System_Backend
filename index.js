import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/auth.js'
import FileRoute from './routes/file.js'
import FolderRoute from './routes/folder.js'
import connectDatabase from './connectDatabase.js'

const app = express()

//middlewares
dotenv.config()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(cookieParser())
app.use("/auth", authRoute)
app.use("/file", FileRoute)
app.use("/folder", FolderRoute)


// Start server only if the database connection is successful
async function startServer() {
    await connectDatabase()

    app.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })
}

startServer()