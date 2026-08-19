import mongoose from "mongoose"
import Event from "../models/event.model.js"
import User from "../models/user.model.js"


export const createEvent = async (req, res) => {
    try {
        const {title, description, location, date, time, category, capacity, availableTickets} = req.body
        if(!title || !description || !location || !date || !time || !category || !capacity || !availableTickets)
            return res.status(400).json({
        message: "All field are required before creating an event"})

        const existingEvent = await Event.findOne({ title })
        if(existingEvent){
            return res.status(400).json({
                message: "Event already exists"
            })
        }
        const event = await Event.create({
            title,
            description,
            location,
            date,
            time,
            category,
            capacity,
            availableTickets,
            bannerImage: req.file ? req.file.path : null,
            organizer: req.user_id
        })
        return res.status(201).json({
            message: "Event created successfully",
            event
        })
    } catch (error) {
       res.status(500).json({
            message: "failed to create event",
            error: error.message
        })  
    }
}

export const getAllEvents = async (req, res) => {
    try {
        const { search, location, category, sort = "newest", page = "1", limit = "10" } = req.query;

        const filter = {}

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            }
        }
        if (location) {
            filter.location = location
        }
        if (category) {
            filter.category = category
        }

        let sortOption = {}
        if (sort === "newest") {
            sortOption = { createdAt: -1 }
        } else if (sort === "oldest") {
            sortOption = { createdAt: 1 }
        } else if (sort === "alphabetical") {
            sortOption = { title: 1 }
        } else if (sort === "reverseAlphabetical") {
            sortOption = { title: -1 }
        }

        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const events = await Event.find(filter)
            .populate("organizer", "name", "lastname", "email")
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber)

        const totalEvents = await Event.countDocuments(filter)

        return res.status(200).json({
            message: "Event retrieved successfully",
            totalEvents,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalEvents / limitNumber),
            events
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to retrieve events",
            error: error.message
        })
    }
}

export const getOneEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id).populate("organizer", "name", "lastname", "email")

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            })
        }

        return res.status(200).json({
            message: "Event successfully found",
            event
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to find event",
            error: error.message
        })
    }
}
export const updateEvent = async (req, res) => {
    try {
        const { title, description, location, date, time, category, capacity, availableTickets } = req.body
        if (!title || !description || !location || !date || !time || !category || !capacity || !availableTickets) {
            return res.status(400).json({
                message: "All fields are required before updating an event"
            })
        }

        const { id } = req.params
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body, { new: true })

        return res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update event",
            error: error.message
        })
    }
}
export const updateOwnEvent = async (req, res) => {
    try {
        const { id } = req.params
        const updatedEvent = await Event.findOneAndUpadte({_id: id, organizer: req.user_id}, req.body, {new: true, runValidators: true})
        
        if(!updateEvent) {
            return res.status(400).json({
                message: "You are not the organizer of this event"
            })
        }
        return res.status(200).json({
            message: "Event updated successfully",
            event: updatedEvent
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update event",
            error: error.message
        })
    }
}

export const cancelOwnEvent = async (req, res) => {
    try {
        const event = await Event.findOne({
            _id: req.params.id,
            organizer: req.user._id
        })
        if(!eventt){
            return res.status(404).json({
                message: "Event not found"
            })
        }
        event.status = "cancelled"
        await event.save()
        return res.status(200).json({
            message: "Event cancelled successfully"
        })
    } catch (error) {
       res.status(500).json({
            message: "internal server error",
            error: error.message
        }) 
    }
}


export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            })
        }

        event.deletedAt = new Date()
        await event.save()

        return res.status(200).json({
            message: "Event deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete event",
            error: error.message
        })
    }
}
export const restoreEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id)

        if (!event) {
            return res.status(400).json({
                message: "Event not found"
            })
        }

        event.deletedAt = null
        await event.save()

        return res.status(200).json({
            message: "Event restored successfully",
            event
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to restore event",
            error: error.message
        })
    }
}