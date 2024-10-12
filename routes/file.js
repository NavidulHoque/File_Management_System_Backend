import express from 'express'
import { protect } from '../controller/auth.js'
import { createFile, deleteFile, readFilesOfParentFolder, updateFile } from '../controller/file.js'

const router = express.Router()

router.post("/create", protect, createFile)

router.put("/:id", protect, updateFile)

router.delete("/:id", protect, deleteFile)

router.get("/:folderID", protect, readFilesOfParentFolder)

export default router