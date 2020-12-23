import Message from "./mongoose-model.js"

export function getMessages(userid, callback) {
    Message.find({'user':userid}, function(err, messages){
        if (err) {
            console.log(err);
        } else{
            console.log(messages);
            return callback(messages);
        }
    })
}

export function addMessage(userid, msg, callback) {
    // msgDB[userid].push(msg);
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