import express from 'express'
import { protect } from '../controller/auth.js'
import { createFile, deleteFile, readFileByID, readFilesOfParentFolder, updateFile } from '../controller/file.js'

const router = express.Router()

router.post("/create", protect, createFile)

router.put("/:id", protect, updateFile)

router.delete("/:id", protect, deleteFile)

//read files under a folder
router.get("/files/:folderID/:userID", protect, readFilesOfParentFolder)

//read a single file
router.get("/:id", protect, readFileByID)

export default router