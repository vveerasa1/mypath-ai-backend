const express= require('express');
const mongoose= require('mongoose');
const config= require('./config/local.json');
const routes= require('./routes/index');

const app=express();
// Connect to MongoDB
mongoose.connect(`${config.mongoDb.url}${config.mongoDb.dbName}`)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        
        // Start your Express server or perform other operations here
    })
    .catch(error => {
        console.error('MongoDB connection error:', error);
    });

    app.listen(`${config.port}`,()=>{
      console.log(`Server is Listening on port ${config.port}`)
    });
    app.use(express.json());
    app.use("/",routes);
