
module.exports = (function () {
    const defaultProgramsUrl = 'http://sch-programs:80/v1/programs';
    const defaultOrderUrl = 'http://sch-orders:80/v1/orders';
    const defaultVersionUrl = 'http://sch-programs:80/v1/programs/version';
    const envProgramsUrl = process.env.API_PROGRAMS;
    const envOrderUrl = process.env.API_ORDER;
    const envVersionUrl = process.env.API_VERSION;
    const envServerPort = process.env.PORT_WEBSERVER;
    var config = {
        port: envServerPort && envServerPort.length>0? envServerPort: 8080,
        url:{
            programs:envProgramsUrl && envProgramsUrl.length>0?
                envProgramsUrl:defaultProgramsUrl,
            order:envOrderUrl && envOrderUrl.length>0?
                envOrderUrl:defaultOrderUrl,
            version:envVersionUrl && envVersionUrl.length>0?
                envVersionUrl:defaultVersionUrl
        }
    };
    return config;
}());