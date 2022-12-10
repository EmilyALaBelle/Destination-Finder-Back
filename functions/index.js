import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { createNewDestination, getAllDestinations, updateDestination, postSpecificDestination, likeDestination, findLiked, unlikeDestination } from './src/destination.js'
import { addNewUser, userLogin, updateUser } from './src/user.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/destinations', getAllDestinations)
app.post('/destinations', createNewDestination)
app.patch('/destinations/:destinationId', updateDestination)
app.post('/destination', postSpecificDestination)
//app.delete('destinations/:destinationId', await deleteDestination)
app.post('/login', userLogin)
app.post('/signup', addNewUser)
app.patch('/update/:userId', updateUser)
app.patch('/like/:destinationId', likeDestination)
app.patch('/unlike/:destinationId', unlikeDestination)
app.get('/like', findLiked)

export const api = functions.https.onRequest(app)