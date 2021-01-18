const Mahasiswa = require('./mahamodel');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
 
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Service untuk mahasiswa pada port ${PORT}`));

const {DB_URI} = require('./dbmaha')
mongoose.set('useUnifiedTopology',true);
mongoose.connect(DB_URI,{ useNewUrlParser: true }, () => console.log('terkoneksi ke db maha'));

app.use(express.json());


app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
  });

app.get('/',function(req,res,next){
    res.json({msg:"ini service mahasiswa"})
});

app.get('/mahasiswa', function (req,res,next) {
    Mahasiswa.find({}).then(function(mahasiswa){
        res.send(mahasiswa);
    }).catch(next);
});

app.post('/mahasiswa/search', function (req,res,next) {
    Mahasiswa.find(req.body).then(function(mahasiswa){
        res.send(mahasiswa);
    }).catch(next);
});

app.get('/mahasiswa/search/:nim', function (req,res,next) {

    Mahasiswa.findOne({nim:req.params.nim}).then(function(mahasiswa){
        res.send(mahasiswa);
    }).catch(next);
});


app.post('/mahasiswa', function (req,res,next) {
    const {nim, password, nama} = req.body;

    // memasukkan logika agar nim password dan nama di isi
    if(!nim || !password || !nama) {
        return res.status(400).json({msg:'tolong isi semuanya'})
    };
    //logika agar tidak memasukkan nim yang sama
    Mahasiswa.findOne({nim}).then(function(mahasiswa) {
        if (mahasiswa) return res.status(400).json({msg:'Mahasiswa sudah ada'});

        const newMaha = new Mahasiswa({
            nim,
            password,
            nama,
            password_asli
        });

        //buat enkripsi

        bcrypt.genSalt(10, function (err,salt){
            bcrypt.hash(newMaha.password, salt, function(err,hash){
                if(err) throw err;
                newMaha.password = hash;
                newMaha.save().then(function(mahasiswa){res.json({
                    mahasiswa : {
                        nim: mahasiswa.nim,
                        password: mahasiswa.password,
                        nama: mahasiswa.nama
                    }   
                })});
            });
        });
    });

});

app.post('/mahasiswa/login', function (req,res,next) {

    const {nim, password} = req.body;

    if(!nim || !password) {
        return res.status(400).json({msg:'tolong isi semuanya'})
    };

    Mahasiswa.findOne({nim}).then(function(mahasiswa) {
        if (!mahasiswa) return res.status(400).json({msg:'Nomor Induk Mahasiswa tidak ada'});

        //validasi
        bcrypt.compare(password, mahasiswa.password).then(isMatch =>{
            if(!isMatch) return status(400).json({ msg: "password salah"});

           
                    res.json({
                        mahasiswa: {
                            nim: mahasiswa.nim,
                            nama: mahasiswa.nama
                        }
                    });
                
                });
        
    });

});


app.put('/mahasiswa/:nim', function (req,res,next) {
    Mahasiswa.findOneAndUpdate({nim: req.params.nim},req.body,{useFindAndModify : false}).then(function(){
        Mahasiswa.findOne({nim: req.params.nim}).then(function(mahasiswa){    
        res.send(mahasiswa);
        });
    }).catch(next);
});


app.delete('/mahasiswa/:nim', function (req,res,next) {
    Mahasiswa.findOneAndDelete({nim: req.params.nim}).then(function(mahasiswa){
        res.send(mahasiswa);
    }).catch(next);
});


