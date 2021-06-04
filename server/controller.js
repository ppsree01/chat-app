// import Message  from "./mongoose-model.js";
// import User from "./mongoose-model.js";
// import Data  from "./mongoose-model.js";
import model from "./mongoose-model.js";

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
    addMessageToDB(userid, msg, callback);
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

export function getAllUsers() {
    model.User.find({}, function(err, entry){
        return entry;
    })
}

export function validate(username, password, callback) {
    // Check if the user name and password is present, retrieve the room details.
    model.User.find({'uid':username, 'pwd':password}, function(err, entry) {
        if (err) {
            callback(err);
            // return constructData([], false);
        } else {
            // Call function to get room, data for this user.
            // callback(getRoomWithData(entry));
            const user = new model.User({
                uid: username,
                pwd: password,
            })
            user.save((err) => {
                if (err != null) {
                    callback("Failed");
                } else {
                    callback("Saved");
                }
            })
        }
    })
}

function getRoomWithData(userData) {
    model.Data.find({'rid': userData['rid']}, function(err, data) {
        if (err) {
            console.log(err);
            return constructData([], true);
        } else {
            return constructData(data, true); 
        }
    })
}

function constructData(data, status) {
    let result = {
        success: status,
        room: {
            messages: []
        }
    }
    for (let item of data) {
        result.room.message.push({
            msg: item["msg"],
            date: item["date"],
            time: item["time"],
            tag: item["tag"],
            type: item["type"]
        })
    }
    return result;
}