const express = require('express');
const jwt = require('jsonwebtoken')
const config = require ('config');
const fetch = require('node-fetch');
//deklarasiin express js sama port
const app = express();
const PORT = process.env.PORT || 3004;
// karena menggunakan rest api, maka gunakan express json sebagai ganti body parser

app.use(express.json());



app.get('/',function(req,res,next){
    res.json({msg:"ini untuk auth jwt"});
});

//untuk mahasiswa
app.post('/mahasiswa/register', function (req,res){
    fetch('http://mahasiswa:3000/mahasiswa', {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify(req.body)})

    .then (response => response.json())
    .then (json => res.json(json))
    .catch(err => console.log(err));

});

app.post('/mahasiswa/login', function (req,res){
    fetch('http://mahasiswa:3000/mahasiswa/login', {
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify(req.body)})

    .then (response => response.json())
    .then (Maha => {
        const mahasiswa = Maha.mahasiswa
        
            jwt.sign(
            {nim : mahasiswa.nim, nama: mahasiswa.nama, role:"mahasiswa"},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err,token) => {
                if(err) throw err;
                res.json({
                    token,
                    mahasiswa: {
                        nim: mahasiswa.nim,
                        nama: mahasiswa.nama
                    }
                });
            }
        )

        
    })
    .catch(err => console.log(err));

});
////////////////////////

//untuk staff
app.post('/staff/register', function (req,res){
    fetch('http://staff:3002/staff', { method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify(req.body)})
    .then (response => response.json())
    .then (json => res.json(json))
    .catch(err => console.log(err));

});

app.post('/staff/login', function (req,res){
    fetch('http://staff:3002/staff/login', { method: "POST",
    headers: {
        "Content-Type":"application/json"
    }, body: JSON.stringify(req.body)})
    .then (response => response.json())
    .then (Staff => {
        const staff = Staff.staff
        
            jwt.sign(
            {nip: staff.nip, nama: staff.nama, role:"staff"},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err,token) => {
                if(err) throw err;
                res.json({
                    token,
                    staff: {
                        nip: staff.nip,
                        nama: staff.nama
                    }
                });
            }
        )

        
    })
    .catch(err => console.log(err));

});

app.post('/admin/login', function (req,res){

        
            jwt.sign(
            {role:"admin"},
            config.get('jwtSecret'),
            {expiresIn: 3600},
            (err,token) => {
                if(err) throw err;
                res.json({
                    token
                });
            }
        )

});



app.listen(PORT, () => console.log(`authentikasi pada port ${PORT}`));