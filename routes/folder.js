import express from 'express'
import { protect } from '../controller/auth.js'
import { createFolder, deleteFolder, readFoldersOfParentFolder } from '../controller/folder.js'

const router = express.Router()

router.post("/create", protect, createFolder)

router.delete("/:id", protect, deleteFolder)

router.get("/:folderID", protect, readFoldersOfParentFolder)

export default router