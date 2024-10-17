import { File } from "../models/File.js";
import { Folder } from "../models/Folder.js";

export default async function deleteFolderAndChildren(folderID, res) {

    try {
        console.log(folderID)
        const childFolders = await Folder.find({parent: folderID})

        // Recursively delete each child folder
        for (const folder of childFolders) {
            
            await deleteFolderAndChildren(folder._id.toString(), res)
        }

        //delete all the files associated with folderID
        await File.deleteMany({parent: folderID})

        //delete the current folder
        await Folder.findByIdAndDelete(folderID)
    } 
    
    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Failed to delete the folder, please try again"
        })
    }
}