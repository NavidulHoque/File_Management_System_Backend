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
        required: [true, 'Extension is required'],
        maxLength: [8, "Extension cannot exceed 8 characters"],
        trim: true
    },

    basename: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Basename is required'],
        minLength: [4, "File's base name should be at least 4 characters long"],
        maxLength: [10, "File's base name cannot exceed 10 characters"],
    },

    fullname: {
        type: String,
        required: [true, 'File name is required'],
        trim: true,
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