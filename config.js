exports.config=
{
    //env : 'product', //dev or product
    env : 'dev', //dev or product
    dev : {
        port:4000,
        staticRoot : '/Users/harry/workspace',
        domain: 'localhost:4000',
        appId : 'wxceea13e5e6fb3ddf'
    },
    product : {
        port:80,
        staticRoot : '/root',
        domain: 'www.52pincar.com',
        appId : 'wxceea13e5e6fb3ddf',
    },
    appId : 'wxceea13e5e6fb3ddf',
};
