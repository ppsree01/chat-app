
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
    let result = {
        success: true,
        room: {
            id: rid,
            messages: []
        },
        message: ""
    }
    model.Data.find({ 'rid': rid }, function (err, data) {
        if (err) {
            result.success = false;
            delete result.room.messages;
            delete result.room.rid;
            result.message = "Data could not be found";
            callback(result);
        } else {
            let msgs = [];
            for (let item of data) {
                msgs.push({
                    msg: item["msg"],
                    datetime: item["datetime"],
                    tag: item["tag"],
                    type: item["type"]
                })
            }
            result.success = true;
            result.room.messages = msgs;
            result.room.rid = rid;
            result.message = "User authenticated!"
            callback(result);
        }
    })
}

function addDefaultMessage(rid, callback) {
    let result = [];
    let datetime = new Date();
    let messages = ["Hi there!", "Welcome to Scratch!", "Feel free to have a look around.."];

    for (let message of messages) {
        result.push({
            rid: rid,
            msg: message,
            datetime: datetime,
            tag: "admin",
            type: "text"
        });
        let data = new model.Data({
            rid: rid,
            msg: message,
            datetime: datetime,
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

export function addMessagesToRoom(rid, msg, tag, type, callback) {
    let datetime = new Date();
    let data = new model.Data({
        rid: rid,
        msg: msg,
        datetime: datetime,
        tag: tag,
        type: type
    });
    data.save((err) => {
        if (err) {
            console.log("Failed")
            callback({
                success: false,
                room: {},
                message: "Data not saved."
            })
        } else {
            console.log("Success")
            callback({
                success: true,
                room: {
                    rid: rid,
                    messages: [data]
                },
                message: "Data saved"
            })
        }
    })
}
