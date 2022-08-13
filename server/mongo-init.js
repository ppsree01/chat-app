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
        mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () => {
        checkConnStatus(callback); 
    }
)
.catch(()=> {console.log("Could not connect")})};