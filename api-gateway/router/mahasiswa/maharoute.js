const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const auth = require('../middleware/verify');


router.post('/peminjaman',auth, (req,res) =>{
   
    const nim = req.user.nim;
    const nama = req.user.nama;
    fetch('http://pinjam:3005/pinjam/search', {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify({nim:nim,nama_maha:nama})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
})

router.post('/pengembalian',auth, (req,res) =>{
   
    const nim = req.user.nim;
    const nama = req.user.nama;
    fetch('http://kembali:3006/kembali/search', {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify({nim:nim,nama_maha:nama})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
})

router.get('/',auth,(req,res)=>{
    const nim = req.user.nim;
    fetch('http://mahasiswa:3000/mahasiswa/search/' + nim) 

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
})



module.exports = router;