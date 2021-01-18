const Buku = require('./bukumodel');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Service untuk buku pada port ${PORT}`));

const {DB_URI} = require('./dbbuku')
mongoose.set('useUnifiedTopology',true);
mongoose.connect(DB_URI,{ useNewUrlParser: true }, () => console.log('terkoneksi ke db buku'));


app.use(express.json());

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message})
});

app.get('/',function(req,res,next){
    res.json({msg:"ini service buku"});
});

app.get('/buku', function (req,res,next) {
    Buku.find({}).then(function(buku){
        res.send(buku);
    }).catch(next)
});

app.post('/buku', function (req,res,next) {
    Buku.create(req.body).then(function(buku){
        res.send(buku);
    }).catch(next);
});

app.post('/buku/search', function (req,res,next) {
    Buku.find(req.body).then(function(buku){
        res.send(buku);
    }).catch(next);
});

app.get('/buku/search/:id', function (req,res,next) {
    Buku.findOne({_id:req.params.id}).then(function(buku){
        res.send(buku);
    }).catch(next);
});

app.put('/buku/:id', function (req,res,next) {
    Buku.findOneAndUpdate({_id: req.params.id},req.body,{useFindAndModify : false}).then(function(){
        Buku.findOne({_id: req.params.id}).then(function(buku){    
        res.send(buku);
        });
    }).catch(next);
});

app.delete('/buku/:id', function (req,res,next) {
    Buku.findOneAndDelete({_id: req.params.id}).then(function(buku){
        res.send(buku);
    }).catch(next);
});
