import { File } from "../models/File.js"

export const checkFile = async (fullname, parent, userID) => {

    const existingBaseName = await File.findOne({ fullname, parent, userID })
    
    if (existingBaseName) {
        return "Filename already exists, please enter another filename"
    }

    return false
}