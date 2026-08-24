import mongoose from "mongoose"
import Payment from "../models/payment.model.js"
import User from "../models/user.model.js"
import Booking from "../models/booking.model.js"



export const makePayment = async (req, res) => {
   try {
     const { bookingId } = req.params
    
    const booking = await Booking.findOne({
        _id: bookingId, 
        user: req.user._id
    })
    if(!booking) {
        return res.status(404).json({
            message: "Booking not found"
        })
    }
    
    const existingPayment = await Payment.findOne({booking: bookingId})
    if(existingPayment) {
        return res.status(400).json({
            message: "Payment already exists"
        })
    }
     // Generate a fake payment reference
    const reference = `PAY-${Date.now()}-${Math.floor(
        Math.random() * 10000
    )}`;
   

    const payment = await Payment.create({
        user: req.user._id,
        booking: req.params.bookingId,
        amount: booking.totalAmount,
        reference,
        status: "successful",
        paymentDate: new Date()
    })
    return res.status(201).json({
        message: "Payment successfully created",
        payment
    })
   } catch (error) {
       res.status(500).json({
            message: "failed to create payment",
            error: error.message
        })  
    }
}

export const getMyPayments = async (req, res) => {
    try {
       const payments = await Payment.find({ user: req.user._id }).populate("booking").sort({ createdAt: -1 })
       return res.status(200).json({
        message: "Payments retrieved successfully",
        payment
       })

    } catch (error) {
       res.status(500).json({
            message: "failed to retrieved payment",
            error: error.message
        })  
    }
}

export const getPayment = async (req, res) => {
    try {
        const { Id } = req.params
        const payment = await Payment.findById(Id).populate("user", "name lastname email").populate("booking")

        if(!payment) {
            return res.status(404).json({
                message: "Payment not found"
            })
        }
        return res.status(200).json({
            message: "Payment retrieved successfully",
            payment
        })
    } catch (error) {
       res.status(500).json({
            message: "failed to retrieved payment",
            error: error.message
        })  
    }
}