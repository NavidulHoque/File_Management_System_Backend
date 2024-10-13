import mongoose from "mongoose";

const { Schema } = mongoose

const FileSchema = new Schema({

    data: {
        type: String,
        default: "",
        trim: true
    },

    extension: {
        type: String,
        default: "txt",
        maxLength: [8, "Extension cannot exceed 8 characters"],
        trim: true
    },

    name: {
        type: String,
        required: [true, 'File name is required'],
        trim: true,
        minLength: [4, "File name should be at least 4 characters long"],
        maxLength: [15, "File name cannot exceed 15 characters"],
        match: [/^\S+\.[a-zA-Z]+$/, 'Enter a valid file name']
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


export const File = mongoose.model('File', FileSchema)