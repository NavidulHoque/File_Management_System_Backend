import { checkFolder } from "../functions/checkFolder.js"
import deleteFolderAndChildren from "../functions/deleteFolderAndChildren.js"
import { Folder } from "../models/Folder.js"

export const createFolder = async (req, res) => {

    const { name, parent, userID } = req.body

    try {

        const isDuplicate = await checkFolder(name, parent, userID)

        if (isDuplicate) {
            return res.json({
                status: false,
                message: isDuplicate,
            })
        }

        const newFolder = new Folder({ name, parent, userID })

        const savedFolder = await newFolder.save()

        const { _id, updatedAt } = savedFolder

        const folder = { id: _id, name, updatedAt }

        return res.json({
            status: true,
            message: "Folder created successfully",
            folder
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

export const deleteFolder = async (req, res) => {
    const { id } = req.params

    await deleteFolderAndChildren(id)

    return res.json({
        status: true,
        message: "Folder successfully deleted!",
        folder: { id }
    })
}

export const readFoldersOfParentFolder = async (req, res) => {

    const { id, userID } = req.params

    try {
        const childFolders = await Folder.find({ parent: id, userID })

        if (childFolders.length === 0) {
            return res.json({
                status: false,
                message: "empty"
            })
        }

        const folders = childFolders.map(folder => {

            const { _id, name, updatedAt, parent } = folder

            const modifiedFolder = { id: _id, name, parent, updatedAt }

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

export const readFoldersOfLoggedInUser = async (req, res) => {

    const { userID } = req.params

    try {
        let folders = await Folder.find({ userID })

        folders = folders.map(folder => {

            const { _id, name, parent } = folder

            const modifiedFolder = { id: _id, name, parent }

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
            message: "Something went wrong, please reload the page"
        })
    }
}