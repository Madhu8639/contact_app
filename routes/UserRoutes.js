import express from "express"
import { registerUser, loginUser, currentUser } from "../controllers/userController.js"
import validateToken from "../middleware/validateTokenHandler.js"
const userrouter = express.Router()
userrouter.post("/register",registerUser)
userrouter.post("/login",loginUser)
userrouter.get("/current", validateToken , currentUser)

export default userrouter