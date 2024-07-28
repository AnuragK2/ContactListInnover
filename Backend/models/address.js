const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipCode: {
        type: Number,
        required: true,
    }
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;