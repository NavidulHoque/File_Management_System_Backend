import mongoose from "mongoose";

const { Schema } = mongoose

const FileSchema = new Schema({

    data: {
        type: String,
        trim: true
    },

    extension: {
        type: String,
        required: [true, 'Extension is required'],
        trim: true
    },

    name: {
        type: String,
        required: [true, 'File name is required'],
        trim: true,
        match: [/^\S+\.[a-zA-Z]+$/, 'Enter a valid file name']
    },

    parent: {
        type: mongoose.Schema.Types.Mixed, // Allows both ObjectId and "root"
        ref: 'Folder',
        default: "root"
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'UserID is required'],
        ref: 'User'
    }

}, { timestamps: true })


export const File = mongoose.model('File', FileSchema)