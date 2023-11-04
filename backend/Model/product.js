const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    image_url: String,
    title: String,
    year: Number,
    price: Number,
    color: String,
    mileage: Number,
    max_speed: Number,

})
const ProductModel = mongoose.model("product", ProductSchema)
module.exports = {
    ProductModel
}