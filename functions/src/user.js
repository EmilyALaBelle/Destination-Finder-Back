import jwt from 'jsonwebtoken'
import mongoSecrets from './mongoSecrets.js'
import { MongoClient, ObjectId } from "mongodb"
const client = new MongoClient(mongoSecrets)
import {secretKey} from '../secrets.js'
const db = client.db("Users")
const userList = db.collection("userList")

export async function userLogin(req, res) {
  const { email, password } = req.body
  const user = await db.collection('userList')
    // .find('email', '==', email.toLowerCase())
    // .find('password', '==', password)
    .findOne({
      $and: [
        {email: email.toLowerCase()},
        {password: password}
      ]
    })
  // const users = matchingUsers.docs.map(doc => ({ ...doc.data(), ObjectId: doc.id }))
  if (!user) {
    res.status(401).send({ message: 'Invalid email or password' })
    return
  }
  user.password = undefined
  const token = jwt.sign(user, secretKey)
  res.send({ user, token })
}

export async function addNewUser(req, res) {
  const { email, password } = req.body
  try{
  await userList.insertOne({ email: email.toLowerCase(), password })
  await userLogin(req, res)
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ error: err })
  }
}

export async function updateUser(req, res) {
  const { userId } = req.params
  try {
    await userList.findOneAndUpdate({_id: new ObjectId(userId) }, {$set: req.body})
    res.status(200).json(updateUser)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: err})
  }
}

