import mongoose from "mongoose";
import Event from "../models/event.model.js"
import Ticket from "../models/ticket.model.js"



const createTicket = async (req, res) => {
    try {
        const { name, price, quantity, availableQuantity } = req.body

        if(!name || !price || !quantity || !availableQuantity) {
            return res.status(400).json({
                message: "All field are required to create a ticket"
            })
        }
    } catch (error) {
        
    }
}

