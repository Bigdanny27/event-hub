import express from "express"
import authRouter from "./routes/auth.route.js"
import eventRouter from "./routes/event.route.js"
import userRouter from "./routes/user.route.js"


const app = express()

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/event", eventRouter)
app.use("/api/users", userRouter)











export default app