
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const mahaSchema = new schema ({
    
    nim : {
        type: Number,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true    
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

const Mahasiswa = mongoose.model('mahasiswa', mahaSchema);

module.exports = Mahasiswa;