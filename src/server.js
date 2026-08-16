import dotenv from "dotenv"

// Load environment variables before importing other modules
dotenv.config({ path: "./.env" })

import app from "./app.js"
import connectDB from "./config/database.js"

const PORT = process.env.PORT || 9000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, ()=>{
            console.log(`server running at http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("server connection fail")
    }
}

startServer()