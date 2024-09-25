let mongoose = require("mongoose")

let prodsch = new mongoose.Schema({
    "id":Number,
    "title":String,
    "price":Number, 
    "description":String,
    "category":String,
    "image":String,
    "sold":Boolean,
    "dateOfSale":Date
})

let prodmodel = mongoose.model("products",prodsch)
module.exports = prodmodel