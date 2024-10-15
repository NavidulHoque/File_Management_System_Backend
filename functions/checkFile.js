import { File } from "../models/File.js"

export const checkFile = async (basename) => {

    const existingBaseName = await File.findOne({ basename })
    
    if (existingBaseName) {
        return "Filename already exists, please enter another filename"
    }

    return false
}