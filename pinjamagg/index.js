const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3007;

app.listen( PORT, () => console.log(`peminjaman pada port ${PORT}`))
app.use(express.json());

app.get('/peminjaman/:id', function(req,res)
{
   
    fetch('http://pinjam:3005/pinjam/:id', {
     method: "GET",
    headers: {
        "Content-Type":"application/json"
    }})
    .then(response => response.json())
    .then(pinjam => response.json(pinjam))
    .catch(err => console.log(err));

});