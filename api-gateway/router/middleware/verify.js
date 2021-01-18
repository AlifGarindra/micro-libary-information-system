const config = require('config');
const jwt = require('jsonwebtoken');
function auth (req,res,next) {
const token = req.header('auth-token');

//ngecek token dulu
if(!token) res.status(401).json({msg:'anda tidak ter autorisasi'});


try {
    //buat variabel verifikasi token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    
    next();
} catch(e) {
    res.status(400).json({msg: 'token tidak valid'})

}
}

module.exports = auth;