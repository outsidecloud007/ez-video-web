module.exports = (function (config) {
    const request = require('request');
    function MainHandler( ) {
         
    }

    MainHandler.prototype.getPrograms=function(){
        return new Promise((resolve,reject)=>{
            request({
                url:config.url.programs
            }, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('Request statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    MainHandler.prototype.getOrders = function(){
        return new Promise((resolve,reject)=>{
            request({
                url:config.url.order
            }, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('Request statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    MainHandler.prototype.orderProgram = function(data){
        return new Promise((resolve,reject)=>{
            request({
                url:config.url.order,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:data
            }, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('Request statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    MainHandler.prototype.deleteOrder = function(orderId){
        //DELETE /v1/orders/{orderId}
        return new Promise((resolve,reject)=>{
            request({
                url:config.url.order+`/${orderId}`,
                method: 'DELETE'
            }, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('Request statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    MainHandler.prototype.getVersion = function(){
        return new Promise((resolve,reject)=>{
            console.log(config.url.version);
            request({
                url:config.url.version
            }, getResponse);

            function getResponse(error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        console.error(error)
                        reject(error);
                    } else {
                        reject('Request statusCode error:' +
                            response.statusCode + ' ,' + response.body);
                    }
                }
            }
        });
    }

    return MainHandler
}(require('../config','request')));