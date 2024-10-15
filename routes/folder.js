import express from 'express'
import { protect } from '../controller/auth.js'
import { createFolder, deleteFolder, readFoldersOfLoggedInUser, readFoldersOfParentFolder } from '../controller/folder.js'

const router = express.Router()

router.post("/create", protect, createFolder)

router.delete("/:id", protect, deleteFolder)

router.get("/foldersOfCurrentFolder/:id", protect, readFoldersOfParentFolder)

router.get("/foldersOfLoggedInUser/:userID", protect, readFoldersOfLoggedInUser)

export default router