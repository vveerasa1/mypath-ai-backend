const environment = process.env.NODE_ENV || 'dev';

const config=require(`./config/${environment}.json`);

module.exports=config;