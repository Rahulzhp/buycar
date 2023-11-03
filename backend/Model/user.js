const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact: { type: Number, required: true },
    city: { type: String, required: true }
})

const UserModel = mongoose.model("caruser", UserShema)

module.exports = {
    UserModel
}