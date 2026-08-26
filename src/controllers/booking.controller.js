import mongoose from "mongoose"
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"
import User from "../models/user.model.js"
import Booking from "../models/booking.model.js"
import Payment from "../models/payment.model.js"




export const findEvent = async (req, res) => {
   const { eventId }  = req.params
    const event = await Event.findById(eventId)
    if(!event) {
        return res.status(400).json({
            message: "Event not found"
        })
    }
    return res.status(200).json({
        message: "Event found successfully",
        event
    })
}


export const findTicket = async (req, res) => {
    const { ticketId } = req.params
    const ticket = await Ticket.findById(ticketId)
    if(!ticket) {
        return res.status(400).json({
            message: "Ticket not found"
        })
    }
    return res.status(200).json({
        message: "Ticket found successfully",
        ticket
    })
}

export const checkTicketAvailability = async (req, res) => {
    try {
        const { ticketId } = req.params
        const quantity = Number(req.query.quantity)
        const ticket = await Ticket.findById(ticketId)

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            })
        }

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            })
        }

        if (ticket.availableQuantity < quantity) {
            return res.status(400).json({
                message: "Not enough tickets available"
            })
        }

        return res.status(200).json({
            message: "There is enough tickets available",
            ticket
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to check ticket availability",
            error: error.message
        })
    }
}

export const calculateTotalPrice = async (req, res) => {
    try {
        const { ticketId, quantity } = req.body
        const requestedQuantity = Number(quantity)

        if (requestedQuantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            })
        }

        const ticket = await Ticket.findById(ticketId)

        if (!ticket) {
            return res.status(404).json({
                message: "Ticket not found"
            })
        }

        const totalPrice = ticket.price * requestedQuantity

        return res.status(200).json({
            message: "Total price calculated successfully",
            totalPrice
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to calculate total price",
            error: error.message
        })
    }
}

export const createBooking = async (req, res) => {
    try {
        const { quantity } = req.body
        const { eventId, ticketId } = req.params
        if(!quantity) {
            return res.status(400).json({
                message: "All field are required to create a booking"
            })
        }

        const booking = await Booking.create({
            event: eventId,
            ticket: ticketId,
            quantity,
            user: req.user._id
        })
        return res.status(201).json({
            message: "Booking created successfully",
            booking
        })
    } catch (error) {
       res.status(500).json({
            message: "failed to create booking",
            error: error.message
        })  
    }
}

export const reduceTicketQuantity = async (req, res) => {
    try {
        const { ticketId } = req.params
        const quantity = Number(req.body.quantity)

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be a positive integer"
            })
        }

        const ticket = await Ticket.findOneAndUpdate(
            { _id: ticketId, availableQuantity: { $gte: quantity } },
            { $inc: { availableQuantity: -quantity } },
            { new: true, runValidators: true }
        )

        if (!ticket) {
            const existingTicket = await Ticket.findById(ticketId)

            return res.status(existingTicket ? 400 : 404).json({
                message: existingTicket
                    ? "Not enough tickets available"
                    : "Ticket not found"
            })
        }

        return res.status(200).json({
            message: "Ticket quantity reduced successfully",
            ticket
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to reduce ticket quantity",
            error: error.message
        })
    }
}

export const createPaymentRecord = async (req, res) => {
    try {
        const { bookingId } = req.params
        const amount = Number(req.body.amount)

        if (!Number.isFinite(amount) || amount < 0) {
            return res.status(400).json({
                message: "Amount must be a non-negative number"
            })
        }

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found"
            })
        }

        const payment = await Payment.create({
            booking: bookingId,
            user: req.user._id,
            amount,
            status: "pending"
        })

        return res.status(201).json({
            message: "Payment record created successfully",
            payment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to create payment record",
            error: error.message
        })
    }
}
