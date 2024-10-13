import { File } from '../models/File.js';

export const createFile = async () => {

    try {

        const newFile = new File(
            {
                extension: req.body.extension,
                name: req.body.name,
                parent: req.body.parent,
                userID: req.body.userID
            }
        )

        await newFile.save()

        return res.json({
            status: true,
            message: "File created successfully"
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

export const updateFile = async () => {

    const { id } = req.useParams

    try {
        const updateFile = await File.findByIdAndUpdate(id, {

            data: req.body.data

        }, { new: true })

        const { data, extension, name, parent, updatedAt } = updateFile

        const file = { data, extension, name, parent, updatedAt }

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

export const deleteFile = async () => {

    const { id } = req.useParams

    try {

        await File.findByIdAndDelete(id)

        return res.json({
            status: true,
            message: "File successfully deleted!"
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

export const readFileByID = async () => {

    const { id } = req.params

    try {
        const file = await File.findById(id)

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

export const readFilesOfParentFolder = async () => {

    const { folderID } = req.params

    try {

        const files = await File.find({ parent: folderID })

        if (files.length === 0) {
            return res.json({
                status: false
            })
        }

        return res.json({
            status: true,
            files
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