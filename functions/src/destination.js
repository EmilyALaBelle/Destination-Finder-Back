import mongoSecrets from './mongoSecrets.js'
import { MongoClient, ObjectId } from "mongodb"
const client = new MongoClient(mongoSecrets)

const db = client.db("Destinations")
const destinationList = db.collection("destinationList")

export async function getAllDestinations(req, res) {
  const filter = {}
  try {
    const allDestinations = await destinationList.find(filter).toArray()
    res.status(200).json(allDestinations)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

export async function createNewDestination(req, res) {
  const destination = req.body
  try {
    await destinationList.insertOne(destination)
    await getAllDestinations(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}
export async function updateDestination(req, res) {
  const { destinationId } = req.params
  try {
    await destinationList.findOneAndUpdate({ _id: new ObjectId(destinationId) }, { $set: req.body })
    res.status(200).json(updateDestination)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}


export async function postSpecificDestination(req, res) {
  const filter = req.body
  try {
    const someDestination = await destinationList.find(filter).toArray()
    res.status(200).json(someDestination)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

export async function likeDestination(req, res) {
  const { destinationId } = req.params
  try {
    const makeLiked = await destinationList.findOneAndUpdate({ _id: new ObjectId(destinationId) }, { $set: { "liked": true } })
    getAllDestinations(req, res)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }

}

export async function unlikeDestination(req, res) {
  const { destinationId } = req.params
  try {
    const makeUnliked = await destinationList.findOneAndUpdate({ _id: new ObjectId(destinationId) }, { $set: { "liked": false } })
    findLiked(req, res)
  } catch (err) {
    console.error(err)
    res.status(200).json({ error: err })
  }
}

export async function findLiked(req, res) {
  const filter = { "liked": true }
  try {
    const isLiked = await destinationList.find(filter).toArray()
    res.status(200).json(isLiked)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

