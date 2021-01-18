
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const staffSchema = new schema ({
    
    nip : {
        type: Number,
        required: true,
        unique: true
    },
    
    password: {
        type: String   
    },
    
    nama : {

        type: String,
        required: [true,' harus di isi']

    },
    
    Date: {
        type: Date,
        default: Date.now
    }
    

});

const Staff = mongoose.model('staff', staffSchema);

module.exports = Staff;