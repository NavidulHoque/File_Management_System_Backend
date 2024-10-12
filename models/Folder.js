import mongoose from "mongoose";

const { Schema } = mongoose

const FolderSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Folder name is required'],
        trim: true
    },

    parent: {
        type: String,
        default: "root"
    },

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'UserID is required'],
        ref: 'User'
    },

    childrenFolders: {
        type: [String],
        default: []
    },

    childrenFiles: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'File'
    }

}, { timestamps: true })


export const Folder = mongoose.model('Folder', FolderSchema)