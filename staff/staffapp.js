const Staff = require('./staffmodel');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const app = express();
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Service untuk staff pada port ${PORT}`));

const {DB_URI} = require('./dbstaff')
mongoose.set('useUnifiedTopology',true);
mongoose.connect(DB_URI,{ useNewUrlParser: true }, () => console.log('terkoneksi ke db staff'));

app.use(express.json());


app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
  });

app.get('/',function(req,res,next){
    res.json({msg:"ini service staff"});
});


app.get('/staff', function (req,res,next) {
    Staff.find({}).then(function(staff){
        res.send(staff);
    }).catch(next);
});

app.post('/staff/search', function (req,res,next) {
    Staff.findOne(req.body).then(function(staff){
        res.send(staff);
    }).catch(next);
});

app.get('/staff/search/:nip', function (req,res,next) {

    Staff.findOne({nip:req.params.nip}).then(function(staff){
        res.send(staff);
    }).catch(next);
});

//Memasukan data staff ke db
app.post('/staff', function (req,res,next) {
 
    const {nip, password, nama} = req.body;

    if(!nip || !password || !nama) {
        return res.status(400).json({msg:'tolong isi semuanya'})
    };

    Staff.findOne({nip}).then(function(staff) {
        if (staff) return res.status(400).json({msg:'staff sudah ada'});

        const newStaff = new Staff({
            nip,
            password,
            nama,
            password_asli
        });

        

        bcrypt.genSalt(10, function (err,salt){
            bcrypt.hash(newStaff.password, salt, function(err,hash){
                if(err) throw err;
                newStaff.password = hash;nip
                newStaff.save().then(function(staff){res.json({
                    staff: {
                        nip: staff.nip,
                        password: staff.password,
                        nama: staff.nama,
                    }
                })});
            });
        });
    });

});

app.post('/staff/login', function (req,res,next) {
    const {nip, password} = req.body;

    if(!nip || !password) {
        return res.status(400).json({msg:'tolong isi semuanya'})
    };

    Staff.findOne({nip}).then(function(staff) {
        if (!staff) return res.status(400).json({msg:'Nomor Induk Karyawan tidak ada'});

        //validasi
        bcrypt.compare(password, staff.password).then(isMatch =>{
            if(!isMatch) return status(400).json({ msg: "password salah"});

           
                    res.json({
                        staff: {
                            nip: staff.nip,
                            nama: staff.nama
                        }
                    });
                
                });
        
    });

});


app.put('/staff/:nip', function (req,res,next) {
    Staff.findOneAndUpdate({nip: req.params.nip},req.body,{useFindAndModify : false}).then(function(){
        Staff.findOne({nip: req.params.nip}).then(function(staff){    
        res.send(staff);
        });
    }).catch(next);
});


app.delete('/staff/:nip', function (req,res,next) {
    Staff.findOneAndDelete({nip: req.params.nip}).then(function(staff){
        res.send(staff);
    }).catch(next);
});


