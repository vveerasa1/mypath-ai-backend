const express= require('express');
const mongoose= require('mongoose');
const dotenv=require('dotenv').config();
const config= require('./config');
const routes= require('./routes/index');

const app=express();
// Connect to MongoDB
mongoose.connect(`${config.mongoDb.url}${config.mongoDb.dbName}`)
    .then(() => {
        console.log('Connected to MongoDB successfully!');      
        console.log(`${config.mongoDb.url}${config.mongoDb.dbName}`);  
        // Start your Express server or perform other operations here
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
    });

    app.listen(config.port,()=>{
      console.log(`Server is Listening on port ${config.port}`)
    });
    app.use(express.json());
    app.use("/",routes);
