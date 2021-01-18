const mongoose = require('mongoose');

const schema = mongoose.Schema;


const pinjamSchema =  new schema({

    nip_staff:{
        type: String,
        required: true
    },
    nama_staff : {

        type: String,
        required: true

    },
    id_buku: {
        type: String,
        required:true
    },
    judul : {
        type: String,
        required: true
    },
    
    pengarang : {
        type: String,
        required: true
    },

    tahun: {
        type: Number,
        required: true
    },
    nim : {
        type: Number,
        required: true,
    },nim : {
        type: Number,
        required: true,
        unique: true
    },
    nama_maha : {

        type: String,
        required: true

    },
    Date: {
        type: Date,
        default: Date.now
    }

    
    
});
const Pinjam = mongoose.model('pinjam', pinjamSchema);

module.exports = Pinjam;