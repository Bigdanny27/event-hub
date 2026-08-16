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
        const { search, location, category, sort = "newest", page = 1, limit = 10} = req.query;

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
        if (sort === "newest"){
            sortOption = {createdAt: -1}
        }else if(sort === "oldest"){
            sortOption = {createdAt: 1}
        }else if(sort === "alphabetical"){
            sortOption = {title: 1}
        }else if(sort === "reverseAlphabetical"){
            sortOption = {title: -1}
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // const pageNumber = Number(page)
        // const limitNumber = Number(limit)
        // const skip = (pageNumber - 1) * limitNumber; This is another way of writing pagination 

        const evenyts = await Event.find(filter)
        .populate("organizer", "name", "lastname", "email")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)

        const totalEvents = await Event.countDocuments(filter)

        return res.status(200).json({
            message: "Event retrieved sucessfully",
            totalEvents,
            currentPage: page,
            totalPages: Math.ceil(totalEvents / limit),
            event
        })
    } catch (error) {
        return res.status(500).json(
            {
                message: " Failed to retrieve events",
                error: error.message
            }
        )
    }
}

export const getOneEvent = async (req, res) => {
    try {
        const { Id } = req.params.id
        const event = await Event.findById(Id).populate("organizer", "name", "lastnme", "email")

        if(!event){
            return res.status(404).json({
                message: "Event not found"
            })
        }
        return res.staus(200).json({
            message: "Event successfully found",
            event
        })
    } catch (error) {
        return res.status(500).json(
            {
                message: " Failed to found event",
                error: error.message
            }
        )
    }
}