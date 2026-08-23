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
    return res.status(201).json({
        message: "Event found successfully",
        event
    })
}


export const findTicket = async (req, res) => {
    const { ticketId } = req.params
    const ticket = await Ticket.findById(ticket)
    if(!ticket) {
        return res.status(400).json({
            message: "Ticket not found"
        })
    }
    return res.status(201).json({
        message: "Ticket found successfully",
        ticket
    })
}

export const checkTicketAvailability = (ticket, quantity) => {
    if(ticket.availableQuantity < quantity) {
        return res.status(400).json({
            message: "Not enough tickets available"
        })
    }
    return res.status(201).json({
        message: "There is enough tickets available",
        ticket
    })
}

export const calculateTotalPrice = (ticket, quantity) => {
    const totalPrice = ticket.price * quantity
    return totalPrice;
}

export const createBooking = async (req, res) => {
    try {
        const { quantity, totalAmount } = req.body
        if(!quantity || !totalAmount) {
            return res.status(400).json({
                message: "All field are required to create a booking"
            })
        }

        const booking = await Booking.create({
            event: req.params.eventId,
            ticket: req.params.ticketId,
            quantity,
            totalAmount,
            customer: req.user._id
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

export const reduceTicketQuantity = async (ticket, quantity)  => {
    ticket.availableQuantity = ticket.availableQuantity - quantity;
    // ticket.availableQuantity -= quantity
    await ticket.save()

    return ticket;
}

export const createPaymentRecord = async (bookingId, totalPrice) => {
    const payment = await Payment.create({
        booking: bookingId,
        amount: totalPrice,
        status: "pending"
    })
}
