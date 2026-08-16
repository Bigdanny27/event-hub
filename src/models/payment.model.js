import mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    reference: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

const Payment = mongoose.model("Payment", paymentSchema)

export default Payment