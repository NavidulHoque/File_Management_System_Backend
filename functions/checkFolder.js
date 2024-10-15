import { Folder } from "../models/Folder.js"

export const checkFolder = async (name, parent, userID) => {

    const existingFolder = await Folder.findOne({ name, parent, userID })
    
    if (existingFolder) {
        return "Folder name already exists, please enter another folder name"
    }

    return false
}