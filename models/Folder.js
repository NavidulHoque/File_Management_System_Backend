import mongoose from "mongoose";

const { Schema } = mongoose

const FolderSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Folder name is required'],
        minLength: [4, "Folder name should be at least 4 characters long"],
        maxLength: [15, "Folder name cannot exceed 15 characters"]
    },

    parent: {
        type: mongoose.Schema.Types.Mixed, // Allows both ObjectId and "root"
        ref: 'Folder',
        required: [true, "Parent is required"]
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UserID is required']
    }

}, { timestamps: true })


export const Folder = mongoose.model('Folder', FolderSchema)