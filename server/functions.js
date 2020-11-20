var crypto = require('crypto'); // 加解密軟體 (內建模組)
var conf = require('./config');

module.exports = {
    // 將明文密碼加密
    passwdCrypto: function (req, res, next) {
        if (req.body.pwd) {
            req.body.pwd = crypto.createHash('md5')
                .update(req.body.pwd + conf.salt)
                .digest('hex');
        }

        next();
    }
};