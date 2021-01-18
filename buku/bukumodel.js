const mongoose = require('mongoose');
const schema = mongoose.Schema;

const bukuSchema = new schema ({
    
    judul : {
        type: String,
        required: true
    },
    
    pengarang : {
        type: String,
        required: [true,' harus di isi']
    },

    tahun: {
        type: Number,
        required: true
    },

    availability: {
        type: Boolean,
        default: true
    },
    
    Date: {
        type: Date,
        default: Date.now
    }
});

const Buku = mongoose.model('buku', bukuSchema);

module.exports = Buku;