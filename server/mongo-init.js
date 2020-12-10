import mongoose from 'mongoose';

function checkConnStatus(callback){
    if (mongoose.connection.readyState == 1){
        callback();
    } else {
        console.log(mongoose.connection.readyState);
    }
}

export const initializeMongo = (callback) => 
    {
        //mongodb://root:example@mongo:27017/admin
        // mongodb://root:example@localhost:8888/admin
        mongoose.connect('mongodb://root:example@mongo:8888/admin',{useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () => {
        checkConnStatus(callback); 
    }
)
.catch(()=> {console.log("Could not connect")})};