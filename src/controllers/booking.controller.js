import mongoose from "mongoose"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
import User from "../models/user.model.js"
import Booking from "../models/booking.model.js"



export const createBooking = async (req, res) => {
    try {
        const { eventId, ticketId } = req.params
        const { quantity } = req.body


        // Find event
        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            })
        }

        // Find ticket
        const ticket = await Ticket.findById(ticketId)

        if(!ticket) {
            return res.status(404).json({
                message: "Ticket not fdound"
            })
        }
        // Check ticket availability
        if(ticket.availableQuantity < quantity) {
            return res.status(400).json({
                messsage: `Only ${ticket.availableQuantity} tickets are available`
            })
        }
        // Calculate total price
        const totalPrice = ticket.price * quantity

        // Create booking
        const booking = await Booking.create({
            event: eventId,
            ticket: ticketId,
            quantity: quantity,
            user: req.user._id
        })

        // Reduce available tickets
        ticket.availableQuantity -= quantity
        await ticket.save();

        // Return response
        return res.status(201).json({
            message: "Booking created successfully",
            booking
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create booking",
            error: error.message
        })
    }
}
