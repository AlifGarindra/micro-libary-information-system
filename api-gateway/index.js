// mengimport express framework dan mengirim http res(fetch)
const express = require('express');
const app = express();
const PORT =  process.env.PORT || 3003;
const fetch = require('node-fetch');

app.listen(PORT, () => console.log(`Api Gateway listening on ${PORT}`));

app.use(express.json());

app.use('/mahasiswa',require('./router/mahasiswa/maharoute'));

app.use('/staff', require('./router/staff/staffroute'))

app.get('/',(req,res)=>{
    res.json({msg:"ini api-gateway"});
});


//untuk login

app.post('/login/mahasiswa',(req,res)=>{
    const {nim,password} = req.body
    fetch('http://auth:3004/mahasiswa/login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        }, body: JSON.stringify({nim,password})})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));
})

app.post('/login/staff',(req,res)=>{
    const {nip,password} = req.body
    fetch('http://auth:3004/staff/login', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        }, body: JSON.stringify({nip,password})})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));
})



//untuk buku
app.post('/buku',(req,res)=>{
    const {judul,pengarang,tahun} = req.body
    fetch('http://buku:3001/buku/search', {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        }, body: JSON.stringify({judul,pengarang,tahun})})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));
})

app.get('/buku/:id',(req,res)=>{
    const id = req.params.id
    fetch('http://buku:3001/buku/search/' + id, {
        method: "GET"})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));
})

app.get('/buku',(req,res)=>{
    fetch('http://buku:3001/buku', {
        method: "GET"})
    
            .then(response => response.json())
            .then(json => res.json(json))
            .catch(err => console.log(err));
});
