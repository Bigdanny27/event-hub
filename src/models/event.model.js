import mongoose from "mongoose"


const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    bannerImage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true

    },
    time: {
        type: String,
        required: true
    },
    category:{
       type: mongoose.Schema.Types.ObjectId,
       ref: "Category",
       required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    availableTickets: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed", "cancelled"],
        default: "upcomimg"
    },
    deletedAt: {
        type: Date,
        default: null
    }

},{timestamps: true})

const Event = mongoose.model("Event", eventSchema)

export default Event