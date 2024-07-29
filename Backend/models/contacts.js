const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    message: {
        type: String,
    }
});

const ContactList = mongoose.model("Contact", contactSchema);
module.exports = ContactList;