import express from "express"
import authRouter from "./routes/auth.route.js"
import eventRouter from "./routes/event.route.js"
import userRouter from "./routes/user.route.js"
import categoryRouter from "./routes/category.route.js"
import ticketRouter from "./routes/ticket.route.js"
import bookingRouter from "./routes/booking.route.js"
import paymentRouter from "./routes/payment.route.js"
import reviewRouter from "./routes/review.route.js"


const app = express()

app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/events", eventRouter)
app.use("/api/users", userRouter)
app.use("/api/categorys", categoryRouter)
app.use("/api/tickets", ticketRouter)
app.use("/api/bookings", bookingRouter)
app.use("/api/payments", paymentRouter)
app.use("/api/reviews", reviewRouter)











export default app