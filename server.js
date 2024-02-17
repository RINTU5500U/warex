const express = require("express")
const mongoose = require("mongoose")
const multer = require('multer')
require('dotenv').config();
const route = require("./src/routes/route")
const app = express()

app.use(express.json())
app.use(multer().any())

mongoose.connect(`mongodb+srv://BiswajitSwain:${process.env.MONGODB_PASSWORD}@cluster0.xf1eq.mongodb.net/warex`).then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message))

app.use("/", route)

app.listen(4000, () => {
    console.log("Express is running on port " + 4000)
})
