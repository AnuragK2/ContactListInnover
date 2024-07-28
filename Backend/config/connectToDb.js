if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');

async function connectToDb() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to DB');
    } catch (err) {
        console.error('Error connecting to DB:', err);
    }
}

module.exports = connectToDb;
