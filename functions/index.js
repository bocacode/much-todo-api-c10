import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { addNewItem, getAllItems, updateItemById, deleteItemById } from './src/items.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post("/items", addNewItem)
app.get("/items", getAllItems)
app.patch("/items/:itemId", updateItemById)
app.delete("/items/:itemId", deleteItemById)

export const api = functions.https.onRequest(app)
