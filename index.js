import {} from 'dotenv/config'

import express from 'express'
import {userRouter,bookRouter,issueRouter,activityRouter} from './app/routes/index.js'
import connectDB from './app/db/connectdb.js'
const app = express()


app.use(express.json())


const port = process.env.PORT || '3000'
const DATABASE_URL = process.env.DATABASE_URL

//Database Connection
connectDB(DATABASE_URL)

//Load Routes
app.use("/", userRouter,bookRouter,issueRouter,activityRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})