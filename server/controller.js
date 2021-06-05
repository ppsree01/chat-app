
import model from "./mongoose-model.js";

export function getMessages(userid, callback) {
    Message.find({ 'user': userid }, function (err, messages) {
        if (err) {
            console.log(err);
        } else {
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
    model.User.find({}, function (err, entry) {
        return entry;
    })
}

export function validate(username, password, callback) {
    // Check if the user name and password is present, retrieve the room details.
    var rid = 0;
    model.User.count((err, count) => {
        rid = count + 1;
    })
    model.User.find({ 'uid': username}, function (err, entry) {
        if (err) {
            callback(err);
        } else {
            if (entry.length == 0) {
                const user = new model.User({
                    uid: username,
                    pwd: password,
                    rid: +rid
                })
                user.save((err) => {
                    if (err != null) {
                        callback(err);
                    } else {
                        addDefaultMessage(rid, callback);
                        
                    }
                })
            } else if (entry.length > 0 && entry[0]["pwd"] != password)  {
                callback({
                    success: false,
                    room : {},
                    message : "Incorrect username / password"
                })
            }
            else {
                getRoomWithData(entry[0]['rid'], callback);
            }
        }
    })
}

function getRoomWithData(rid, callback) {
    model.Data.find({ 'rid': rid }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let msgs = [];
            for (let item of data) {
                msgs.push({
                    msg: item["msg"],
                    date: item["date"],
                    time: item["time"],
                    tag: item["tag"],
                    type: item["type"]
                })
            }
            console.log(msgs);
            let result = {
                success: true,
                room: {
                    id: rid,
                    messages: msgs
                },
                message: "User authenticated!"
            }
            callback(result);
        }
    })
}

function addDefaultMessage(rid, callback) {
    let result = [];
    let messages = ["Hi there!", "Welcome to Scratch!", "Feel free to have a look around.."];

    for (let message of messages) {
        result.push({
            rid: rid,
            msg: message,
            date: "01-01-2020",
            time: "01:01:01",
            tag: "admin",
            type: "text"
        });
        let data = new model.Data({
            rid: rid,
            msg: message,
            date: "01-01-2020",
            time: "01:01:01",
            tag: "admin",
            type: "text"
        })
        data.save((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("saved");
            }
        })
    }
    getRoomWithData(rid, callback);
    // return result;
}

export function addMessagesToRoom(rid, ) {

}
