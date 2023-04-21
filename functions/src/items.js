import { db } from "./dbConnect.js"

const coll = db.collection('tasks')

export async function addNewItem(req, res) {
  const newItem = req.body
  await coll.add(newItem)
    .catch(err => {
      res.status(500).send({err})
      return
    })
  // now return the whole (updated) list...
  getAllItems(req, res)
}

export async function getAllItems(req, res) {
  const itemsMessy = await coll.get()
    .catch(err => {
      res.status(500).send({err})
      return
    })
  const itemsClean = itemsMessy.docs.map(doc => ({ ...doc.data(), id: doc.id }))
  res.send(itemsClean)
}

export async function updateItemById(req, res) {
  const { itemId } = req.params
  const updates = req.body
  await coll.doc(itemId).update(updates)
    .catch(err => {
      res.status(500).send({err})
      return
    })
  // now return the whole (updated) list...
  getAllItems(req, res)
}

export async function deleteItemById(req, res) {
  const { itemId } = req.params
  await coll.doc(itemId).delete()
    .catch(err => {
      res.status(500).send({err})
      return
    })
  // now return the whole (updated) list...
  getAllItems(req, res)
}
