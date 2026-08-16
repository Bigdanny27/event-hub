import express from "express"
import authRouter from "./routes/auth.route.js"
import eventRouter from "./routes/event.route.js"


const app = express()

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/event", eventRouter)











export default app