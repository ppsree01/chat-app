
import express from 'express';
import mongoose from 'mongoose';
import Message from './mongoose-model.js';
const app = express();
const port = 80;

let Admin = mongoose.mongo.Admin;
mongoose.connect('mongodb://root:example@mongo:27017/admin',{useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () => {
        checkConnStatus();
    }
)
.catch(()=> {console.log("Could not connect")});
 

// let connecting = true;
function checkConnStatus(){
    if (mongoose.connection.readyState == 1){
        console.log("Entered");
        app.listen(port, () => {
            console.log(`app listening at port ${port}`);
        })
    } else {
        console.log(mongoose.connection.readyState);
    }
}

// Objective: create a collection if it doesn't already exist.


// setTimeout(() => {checkConnStatus()}, 5000);


let msgDB = 
{
    "vava": [
            {
                msg: "How are you ?",
                time: 1122121
            },
            {
                msg: "Hello",
                time: 22323
            }
        ],
    "kannan": [
            {
                msg: "Chicken fry",
                time: 20000000,
            },
            {
                msg: "training",
                time: 122222
            }
        ]
    
}

app.use(express.json());
app.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 500);
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/:userid',(req,res) => {
    // res.send("Hello World");
    getMessages(req.params.userid, messages => res.send(messages));
});

app.post('/add', (req,res) => {
    if (Math.random() < 0.2) {
        res.status(500).send({
            success: false,
        });
        return
    }
    var msg = req.body.message;
    var userid = req.body.userid;
    addMessage(userid, msg, () => {res.send({success: true});});

});

function getMessages(userid, callback) {
    Message.find({'user':userid}, function(err, messages){
        if (err) {
            console.log(err);
        } else{
            console.log(messages);
            return callback(messages);
        }
    })
}

function addMessage(userid, msg, callback) {
    msgDB[userid].push(msg);
    addMessageToDB(userid, msg, callback);
    // callback();
}

function addMessageToDB(userid, msg, callback) {
    const message = new Message(
        {
            msg: msg.msg,
            time: msg.time,
            user: userid
        }
    );
    message.save((err) => {
        if (err != null) {
            console.log("Saving Failed");
        } else {
            callback();
        }
    })
}