import User from "../models/user.model.js"


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        if(!users){
            return res.status(404).json({
                message: "no users found"
            })
        }
        return res.status(200).json({
            message: "users successfully found",
            users
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        let user = await User.findByIdAndDelete(id)
        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }
        await User.findByIdAndDelete(id)
        return res.status(200).json({
            message: "user successfully deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

export const uploadProfilePicture = async (req, res) => {
    try {
        // req.file is populated by the multer middleware
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // When using Cloudinary, the secure URL is provided in req.file.path
        // If local, it will be the local file path (e.g., 'uploads/avatar-123.jpg')
        const fileUrl = req.file.path; 

        // Example: Update the user's document in the database
        // await User.findByIdAndUpdate(req.user.id, { avatarUrl: fileUrl });

        return res.status(200).json({
            message: "File uploaded successfully",
            url: fileUrl
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error uploading file",
            error: error.message
        });
    }
};