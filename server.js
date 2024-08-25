import express from "express"
import dotenv from "dotenv"
import router from "./routes/ContactRoutes.js"
import errorHandler from "./middleware/errorhandler.js"
import { connect } from "mongoose"
import connectDb from "./config/dbConnection.js"
import userrouter from "./routes/UserRoutes.js"

dotenv.config()

connectDb()
const app = express()
const port = process.env.PORT 


app.use(express.json())
app.use("/api/contacts", router)
app.use("/api/users", userrouter)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("deadpool fucks wolvarine")
})