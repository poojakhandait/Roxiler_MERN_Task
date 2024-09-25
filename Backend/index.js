let express = require("express")
let mongoose = require("mongoose")
let axios = require("axios")

let app = express()
let cors = require("cors")
const route = require("./Routes/productroute")
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/roxiler").then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("Connection Failed")
})

app.use("/",route )
app.listen(5000)