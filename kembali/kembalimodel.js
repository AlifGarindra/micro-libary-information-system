const mongoose = require('mongoose');

const schema = mongoose.Schema;


const kembaliSchema =  new schema({

    
    nip_staff:{
        type: String,
        required: true
    },
    nama_staff:{
        type:String,
        required:true
    },
    id_pinjam: {
        type: String,
        required:true
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
const Kembali = mongoose.model('kembali', kembaliSchema);

module.exports = Kembali;