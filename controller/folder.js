import { File } from "../models/File.js"
import { Folder } from "../models/Folder.js"

export const createFolder = async () => {

    try {
        const newFolder = new Folder(
            {
                name: req.body.name,
                parent: req.body.parent,
                userID: req.body.userID
            }
        )

        await newFolder.save()

        return res.json({
            status: true,
            message: "Folder created successfully"
        })
    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again",
        })
    }
}

export const deleteFolder = async () => {
    const { id } = req.useParams

    try {

        const query = {parent: id}

        await Folder.findByIdAndDelete(id)

        await Folder.deleteMany(query)

        await File.deleteMany(query)

        return res.json({
            status: true,
            message: "Folder successfully deleted!"
        })
    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong, please try again"
        })
    }
}

export const readFoldersOfParentFolder = async () => {

    const {id} = req.params

    try {
        let folders = await Folder.find({ parent: id })

        if (folders.length === 0) {
            return res.json({
                status: false,
                message: "empty"
            })
        }

        folders = folders.map(folder => {

            const {_id, name, updatedAt, parent} = folder

            const modifiedFolder = {id: _id, name, parent, updatedAt}

            return modifiedFolder
        })

        return res.json({
            status: true,
            folders
        })
    } 
    
    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong loading folders, please reload the page"
        })
    }
}