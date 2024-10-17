import { checkFile } from '../functions/checkFile.js';
import { File } from '../models/File.js';

export const createFile = async (req, res) => {

    const { extension, basename, fullname, parent, userID } = req.body

    try {

        const newFile = new File({ extension, basename, fullname, parent, userID })

        const isDuplicate = await checkFile(fullname, parent, userID)

        if (isDuplicate) {
            return res.json({
                status: false,
                message: isDuplicate
            })
        }

        const savedFile = await newFile.save()

        const { _id, updatedAt } = savedFile

        const file = { id: _id, name: fullname, updatedAt }

        return res.json({
            status: true,
            message: "File created successfully",
            file
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

export const updateFile = async (req, res) => {

    const { id } = req.params

    try {
        const updatedFile = await File.findByIdAndUpdate(id, {

            data: req.body.data

        }, { new: true })

        const { data, extension, fullname, parent } = updatedFile

        const file = { name: fullname, data, extension, parent }

        return res.json({
            status: true,
            file,
            message: "File Saved"
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

export const deleteFile = async (req, res) => {

    const { id } = req.params

    try {

        const deletedFile = await File.findByIdAndDelete(id)

        return res.json({
            status: true,
            message: "File successfully deleted!",
            file: {id: deletedFile._id}
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

export const readFileByID = async (req, res) => {

    const { id } = req.params

    try {
        let file = await File.findById(id)

        const { fullname, data, extension, parent } = file

        file = { name: fullname, data, extension, parent }

        return res.json({
            status: true,
            file
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

export const readFilesOfParentFolder = async (req, res) => {

    const { folderID, userID } = req.params

    try {

        const childFiles = await File.find({ parent: folderID, userID })

        if (childFiles.length === 0) {
            return res.json({
                status: false,
                message: "empty"
            })
        }

        const files = childFiles.map(file => {

            const { _id, fullname, updatedAt } = file

            const modifiedFile = { id: _id, name: fullname, updatedAt }

            return modifiedFile
        })

        return res.json({
            status: true,
            files
        })
    }

    catch (error) {
        console.error(error)

        return res.json({
            status: false,
            message: "Something went wrong loading files, please reload the page"
        })
    }
}