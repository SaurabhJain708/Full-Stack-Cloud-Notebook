const express = require('express')
const app = express()
const port = 5000
const ConnectMongodb = require('./Connections/connectmongo')
const userrouter = require('./Routes/userroutes')
const noterouter = require('./Routes/noteroutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoURI = process.env.MONGO_URI;

ConnectMongodb(mongoURI)

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use('/user',userrouter)
app.use('/note',noterouter)

app.listen(port, () => {
  console.log(`Hello  ${port}`)
})