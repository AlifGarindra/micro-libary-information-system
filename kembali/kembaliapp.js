const Kembali = require('./kembalimodel');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => console.log(`Service untuk pengembalian pada port ${PORT}`));

const {DB_URI} = require('./dbkembali')
mongoose.set('useUnifiedTopology',true)
mongoose.connect(DB_URI,{ useNewUrlParser: true }, () => console.log('terkoneksi ke database pengembalian'));


app.use(express.json());

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
  });

app.get('/',function(req,res,next){
    res.json({msg:"ini service pengembalian"});
});

app.post('/kembali', function (req,res,next) {

    Kembali.create(req.body).then(function(kembali){
        res.send(kembali);
    }).catch(next);
});

app.get('/kembali', function (req,res,next) {
    Kembali.find({}).then(function(kembali){
        res.send(kembali);
    }).catch(next)
});


app.post('/kembali/search', function (req,res,next) {
    Kembali.find(req.body).then(function(kembali){
        res.send(kembali);
    }).catch(next);
});

app.get('/kembali/search/:id', function (req,res,next) {

    Kembali.findOne({_id:req.params.id}).then(function(kembali){
        res.send(kembali);
    }).catch(next);
});

app.put('/kembali/:id', function (req,res,next) {
    Kembali.findOneAndUpdate({_id: req.params.id},req.body,{useFindAndModify : false}).then(function(){
        Kembali.findOne({_id: req.params.id}).then(function(kembali){    
        res.send(kembali);
        });
    }).catch(next);
});


app.delete('/kembali/:id', function (req,res,next) {
    Kembali.findOneAndDelete({_id: req.params.id}).then(function(kembali){
        res.send(kembali);
    }).catch(next);
});



