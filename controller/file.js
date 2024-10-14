import { File } from '../models/File.js';

export const createFile = async () => {

    try {

        const newFile = new File(
            {
                extension: req.body.extension,
                basename: req.body.basename,
                fullname: req.body.fullname,
                parent: req.body.parent,
                userID: req.body.userID
            }
        )

        const savedFile = await newFile.save()

        const {fullname, _id, updatedAt} = savedFile

        const file = {id: _id, name: fullname, updatedAt}

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

export const updateFile = async () => {

    const { id } = req.useParams

    try {
        const updatedFile = await File.findByIdAndUpdate(id, {

            data: req.body.data

        }, { new: true })

        const { data, extension, fullname } = updatedFile

        const file = {name: fullname, data, extension}

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
        let file = await File.findById(id)

        const {fullname, data, extension} = file

        file = {name: fullname, data, extension}

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

        let files = await File.find({ parent: folderID })

        if (files.length === 0) {
            return res.json({
                status: false,
                message: "empty"
            })
        }

        files = files.map(file => {

            const {_id, fullname, updatedAt} = file

            const modifiedFile = {id: _id, name: fullname, updatedAt}

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