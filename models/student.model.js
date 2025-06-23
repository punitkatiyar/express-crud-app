const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userMobile: {
        type: String
    },

})

const student = mongoose.model("Student", studentSchema)

module.exports = student