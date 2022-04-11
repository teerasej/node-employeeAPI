// import Schema Class และ function model มาเพื่อใช้งาน
const mongoose = require('mongoose')


// กำหนด field ให้กับ Schema 
const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        required:true
    },
    firstName: String,
    lastName: String
});

const EmployeeModel = mongoose.model('Employee', employeeSchema)

module.exports = EmployeeModel