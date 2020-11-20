module.exports = (function () {
    var url = window.location.origin;
    var debugHost = 'http://10.144.190.208:30569';
    var debugHost2 = 'http://127.0.0.1:8080';
    return {
       url:{
           programs: url+'/programs',
           orders:url+'/orders',
           orderProgram:url+'/orderProgram',
           version:url+'/version',
       }
    }
}())