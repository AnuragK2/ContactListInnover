const Contact = require('../models/contacts');
const Address = require('../models/address');

const fetchContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json({ contacts: contacts });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while fetching contacts", error: err.message });
    }
}

const fetchContactsById = async (req, res) => {
    try {
        const contactId = req.params.id;
        console.log(`Fetching contact with ID: ${contactId}`);

        const contact = await Contact.findById(contactId).populate('address');
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ contact: contact });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while fetching the contact by ID", error: err.message });
    }
}

const createContacts = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, address, city, state, zipCode, dateOfBirth, gender, company, website, message } = req.body;

        if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !gender) {
            return res.status(400).json({ success: false, message: "Fields are required" });
        }

        const newAddress = new Address({
            streetAddress: address,
            city,
            state,
            zipCode
        });
        const savedAddress = await newAddress.save();

        const contact = new Contact({
            firstName,
            lastName,
            email,
            phoneNumber,
            address: [savedAddress._id],
            dateOfBirth: new Date(dateOfBirth),
            gender,
            company,
            website,
            message
        });

        const savedContact = await contact.save();
        res.json({ contact: savedContact });
    } catch (err) {
        console.error("Error creating contact:", err.message);
        res.status(500).json({ success: false, message: "An error occurred while creating the contact", error: err.message });
    }
}

const updateContact = async (req, res) => {
    try {
        const contactsId = req.params.id;
        const { firstName, lastName, email, phoneNumber, address, city, state, zipCode, dateOfBirth, gender, company, website, message } = req.body;

        let contact = await Contact.findById(contactsId);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }

        if (address && city && state && zipCode) {
            const newAddress = new Address({
                streetAddress: address,
                city,
                state,
                zipCode
            });
            const savedAddress = await newAddress.save();
            contact.address = [savedAddress._id];
        }

        contact.firstName = firstName || contact.firstName;
        contact.lastName = lastName || contact.lastName;
        contact.email = email || contact.email;
        contact.phoneNumber = phoneNumber || contact.phoneNumber;
        contact.dateOfBirth = dateOfBirth ? new Date(dateOfBirth) : contact.dateOfBirth;
        contact.gender = gender || contact.gender;
        contact.company = company || contact.company;
        contact.website = website || contact.website;
        contact.message = message || contact.message;

        const updatedContact = await contact.save();
        res.json({ contact: updatedContact });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while updating the contact", error: err.message });
    }
}

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;

        const result = await Contact.findByIdAndDelete(contactId);
        if (!result) {
            return res.status(404).json({ success: false, message: "Contact not found" });
        }

        res.json({ success: "Contact deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "An error occurred while deleting the contact", error: err.message });
    }
}

module.exports = {
    fetchContacts,
    fetchContactsById,
    createContacts,
    updateContact,
    deleteContact
}
