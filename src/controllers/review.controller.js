import mongoose from "mongoose"
import User from "../models/user.model.js"
import Event from "../models/event.model.js"
import Review from "../models/review.model.js"



export const createReview = async (req, res) => {
   try {
     const { rating, comment } = req.body

    const existingReview = await Review.findOne({
        user: req.user._id,
        event: req.params.eventId
    })

    if(existingReview) {
        return res.status(400).json({
            message: "You have already review this event"
        })
    }
    const review = await Review.create({
        user: req.user._id,
        event: req.params.eventId,
        rating: rating,
        comment: comment
    })
    return res.status(201).json({
        message: "Review created successfully",
        review
    })
   }  catch (error) {
       res.status(500).json({
            message: "failed to create review",
            error: error.message
        })  
    }
    
}

export const getReview = async (req, res) => {
    try {
       const { eventId } = req.params

        const review = await Review.find({ event: eventId })
        return res.status(200).json({
            message: "Reviews retrieved successfully",
            review
        })

    } catch (error) {
       res.status(500).json({
            message: "failed to retrieved reviews",
            error: error.message
        })  
    }
}