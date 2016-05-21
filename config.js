exports.config=
{
    //env : 'product', //dev or product
    env : 'dev', //dev or product
    dev : {
        port:4000,
        staticRoot : '/Users/harry/workspace',
        domain: 'localhost:4000'
    },
    product : {
        port:80,
        staticRoot : '/root',
        domain: 'www.52pincar.com'
    }
};
