// เรียกใช้งาน environment variable
require('dotenv').config();

// เรียกใช้งาน express module 
const express = require('express');
const { enable } = require('express/lib/application');
const Joi = require('joi');

let app = express();
const PORT = process.env.PORT

const MONGO_HOST = process.env.MONGO_DB_HOST
const MONGO_PORT = process.env.MONGO_DB_PORT
console.log('mongo env:',MONGO_HOST, MONGO_PORT)

const db = require('monk')(`${MONGO_HOST}:${MONGO_PORT}/employeeDB`)

app.use(express.json());

// กำหนด route url 
app.get('/', (request, respond) => {
    respond.send('hello');
});

app.get('/employees', async (req, res) => {

    const employeeCollection = db.get('employees')
    const collection = await employeeCollection.find({})

    res.json(collection);
})

app.post('/employees', async (req, res) => {
    
    const newEmployee = req.body;

    const objectSchema = Joi.object({
        firstName: Joi.string().min(3).required().messages({
            "string.min": "Must more than 3 characters",
            "any.required":"Email is required!"
        }),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().email().required().messages({
            "any.required":"Email is required!"
        })
    })
    const { error } = objectSchema.validate(newEmployee)


    if(error) {
        console.log(error)
        res.status(400).json({ message: error.details[0].message })
    }

    console.log('New employee:', newEmployee);
    
    const employeeCollection = db.get('employees')
    const insertedDocument = await employeeCollection.insert(newEmployee)

    res.json({ message: 'ok', doc: insertedDocument })
})

// กำหนด port และเริ่มการทำงาน
app.listen(PORT, ()=>{
    console.log(`server is running at port http://localhost:${PORT}`);
})