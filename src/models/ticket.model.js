import mongoose from "mongoose"

const ticketSchema = new mongoose.Schema({
   event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
    trim: true
   },
   name: {
    type: String,
    required: true,
    trim: true
   },
   price: {
    type: String,
    required: true,
    min: o
   },
   quantity: {
    type: Number,
    required: true,
    min: 1
   },
   availableQuantity: {
    type: Number,
    required: true,
    min: 0
   },

},{timestamps: true})


const Ticket = mongoose.model("Ticket", ticketSchema)

export default Ticket