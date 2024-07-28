//Loaded env variables
if (process.env.NODE_ENV != "production") {     
    require("dotenv").config();
}

//imported dependencies
const express = require('express')
const connectToDb=require('./config/connectToDb')
const contactController=require('./Controllers/contactController')
const cors = require("cors");

//created an express app
const app = express();

//Configured express app
app.use(express.json());
app.use(cors())

//connected to database
connectToDb();

//Routing
app.get("/", (req, res) => {
    res.json({connection:"established"})
})
app.get("/contacts", contactController.fetchContacts)
app.get("/contacts/:id", contactController.fetchContactsById)
app.post('/contacts', contactController.createContacts)
app.put("/contacts/:id", contactController.updateContact)
app.delete("/contacts/:id", contactController.deleteContact)
    

app.listen(process.env.PORT)