const Pinjam = require('./pinjammodel');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3005;

app.listen(PORT, () => console.log(`Service untuk pinjam pada port ${PORT}`));

const {DB_URI} = require('./dbpinjam')
mongoose.set('useUnifiedTopology',true)
mongoose.connect(DB_URI,{ useNewUrlParser: true }, () => console.log('terkoneksi ke dbpinjam'));


app.use(express.json());


app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
});

app.get('/',function(req,res,next){
    res.json({msg:"ini service pinjam"});
});

app.get('/pinjam', function (req,res,next) {
    Pinjam.find({}).then(function(pinjam){
        res.send(pinjam);
    }).catch(next)
});

app.post('/pinjam/search', function (req,res,next) {
    Pinjam.find(req.body).then(function(pinjam){
        res.send(pinjam);
    }).catch(next);
});

app.get('/pinjam/search/:id', function (req,res,next) {

    Pinjam.findOne({_id:req.params.id}).then(function(pinjam){
        res.send(pinjam);
    }).catch(next);
});

app.post('/pinjam', function (req,res,next) {
    
    Pinjam.create(req.body).then(function(pinjam){
        res.send(pinjam);
    }).catch(next);
});

app.put('/pinjam/:id', function (req,res,next) {
    Pinjam.findOneAndUpdate({_id: req.params.id},req.body,{useFindAndModify : false}).then(function(){
        Pinjam.findOne({_id: req.params.id}).then(function(pinjam){    
        res.send(pinjam);
        });
    }).catch(next);
});

app.delete('/pinjam/:id', function (req,res,next) {
    Pinjam.findOneAndDelete({_id: req.params.id}).then(function(pinjam){
        res.send(pinjam);
    }).catch(next);
});



