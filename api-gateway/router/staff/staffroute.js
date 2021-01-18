const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const auth = require('../middleware/verify');

router.use(express.json());
//untuk staff
router.get('/',auth, (req,res) =>{
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{ 
        const nip = req.user.nip
        fetch('http://staff:3002/staff/search/' + nip, {
        method: "GET"})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));}
    
});

router.get('/Allstaff',auth, (req,res) =>{
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{ 

        fetch('http://staff:3002/staff/', {
        method: "GET"})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));}
    
});
router.get('/Allstaff/:nip',auth, (req,res) =>{
    const nip = req.params.nip
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://staff:3002/staff/search/' + nip, {
    method: "GET",
    headers: {
        "Content-Type":"application/json"
    }})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

//untuk mahasiswa
// router.post('/Allmaha/search',auth, (req,res) =>{
//     const staff = "staff"
//     if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
//     else{
//     fetch('http://mahasiswa:3000/mahasiswa/search', {
//     method: "POST",
//     headers: {
//         "Content-Type":"application/json"
//     }, body: JSON.stringify({})})

//         .then(response => response.json())
//         .then(json => res.json(json))
//         .catch(err => console.log(err));
//     }
// });

router.get('/Allmaha/:nim',auth, (req,res) =>{
    const nim = req.params.nim
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://mahasiswa:3000/mahasiswa/search/' + nim, {
    method: "GET",
    headers: {
        "Content-Type":"application/json"
    }})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});


router.get('/Allmaha',auth, (req,res) =>{
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://mahasiswa:3000/mahasiswa', {
    method: "GET"
    })

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

//bagian peminjaman
router.post('/peminjaman',auth, (req,res) =>{
    const {id_buku,judul,pengarang,tahun,nim,nama_maha } = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://pinjam:3005/pinjam', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({nip_staff:req.user.nip,nama_staff:req.user.nama,id_buku,judul,pengarang,tahun,nim,nama_maha})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

router.post('/peminjaman/search',auth, (req,res) =>{
    const {id_buku,judul,pengarang,tahun,nim,nama_maha } = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://pinjam:3005/pinjam/search', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({nip_staff:req.body.nip,nama_staff:req.body.nama,id_buku,judul,pengarang,tahun,nim,nama_maha})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

router.get('/peminjaman',auth, (req,res) =>{
    
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://pinjam:3005/pinjam', {
    method: "GET"})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});


router.get('/peminjaman/:id',auth, (req,res) =>{
    const staff = "staff"
    const id = req.params.id
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{

        fetch(`http://pinjam:3005/pinjam/search/` + id, {
        method: "GET",
        headers: {"Content-Type":"application/json",
                  "auth-token":"application/json"  }})
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err))
;
    }
});

router.delete('/peminjaman/:id',auth, (req,res) =>{
    const staff = "staff"
    const id = req.params.id
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
        fetch(`http://pinjam:3005/pinjam/` + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type":"application/json"
        }
    })
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err))
;
    }
});

//penanganan Pengembalian
router.post('/pengembalian',auth, (req,res) =>{
    const {id_pinjam,id_buku,judul,pengarang,tahun,nim,nama_maha } = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://kembali:3006/kembali', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({nip_staff:req.user.nip,nama_staff:req.user.nama,id_pinjam,id_buku,judul,pengarang,tahun,nim,nama_maha})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

router.post('/pengembalian/search',auth, (req,res) =>{
    const {nip_staff,nama_staff,id_pinjam,id_buku,judul,pengarang,tahun,nim,nama_maha } = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://kembali:3006/kembali/search', {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({nip_staff,nama_staff,id_pinjam,id_buku,judul,pengarang,tahun,nim,nama_maha})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

router.get('/pengembalian',auth, (req,res) =>{
    
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://kembali:3006/kembali', {
    method: "GET"})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

// router.put('/pengembalian/data/:id',auth, (req,res) =>{
//     const {id_pinjam,nip_staff,nama_staff,id_buku,judul,pengarang,tahun,nim,nama_maha } = req.body
//     const staff = "staff"
//     const id = req.params.id
//     if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
//     else{
       
//     fetch('http://kembali:3006/kembali/' + id , {
//     method: "PUT",
//     headers: {
//         'Accept': 'application/json',
//         "Content-Type":"application/json"
//     },body: JSON.stringify({nip_staff,nama_staff,id_pinjam,id_buku,id_buku,judul,pengarang,tahun,nim,nama_maha})})

//         .then(response => response.json())
//         .then(json => res.json(json))
//         .catch(err => console.log(err));
//     }
// });

router.get('/pengembalian/:id',auth, (req,res) =>{
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    const id = req.params.id
        fetch(`http://kembali:3006/kembali/search/` + id, {
        method: "GET"})
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err))
;
    }
});

router.delete('/pengembalian/:id',auth, (req,res) =>{
    const staff = "staff"
    const id = req.params.id
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
 
        fetch(`http://kembali:3006/kembali/` + id, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            "Content-Type":"application/json",
            "auth-token":"application/json"
        }
         })
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err))
;
    }
});

// penanganan BUKU

router.post('/buku',auth, (req,res) =>{

    const {judul,pengarang,tahun} = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
    fetch('http://buku:3001/buku/' , {
    method: "POST",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({judul,pengarang,tahun})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});

router.put('/buku/:id',auth, (req,res) =>{
    const id = req.params.id
    const {judul,pengarang,tahun} = req.body
    const staff = "staff"
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{
 
    fetch('http://buku:3001/buku/' + id , {
    method: "PUT",
    headers: {
        'Accept': 'application/json',
        "Content-Type":"application/json"
    },body: JSON.stringify({judul,pengarang,tahun})})

        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err));
    }
});


router.delete('/buku/:id',auth, (req,res) =>{
    const staff = "staff"
    const id = req.params.id
    if(req.user.role != staff) {res.status(404).json({msg:"anda bukan staff!"})}
    else{

        fetch(`http://buku:3001/buku/` + id, {
        method: "DELETE"})
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err))
;
    }
});





module.exports = router;