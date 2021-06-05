import {getMessages, addMessage, validate, addMessagesToRoom} from "./controller.js";

export default {
    // "/:userid": {
    //     method: "get",
    //     handler: (req,res) => {
    //         getMessages(req.params.userid, messages => res.send(messages));
    //     }
    // },
    // "/add": {
    //     method: "post",
    //     handler: (req,res) => {
    //         if (Math.random() < 0.2) {
    //             res.status(500).send({
    //                 success: false,
    //             });
    //             return
    //         }
    //         var msg = req.body.message;
    //         var userid = req.body.userid;
    //         addMessage(userid, msg, () => {res.send({success: true})});
    //     }
    // },
    "/auth": {
        method: "post",
        handler: (req,res) => {
            var user = req.body.username;
            var pwd = req.body.password;
            // console.log(req.body);
            // console.log(req.username);
            validate(user, pwd, (result) => {
                console.log(result);
                res.send(result);
            });

        }
    },
    "/add": {
        method: "post",
        handler: (req,res) => {
            var rid = req.body.rid;
            var msg = req.body.msg;
            var tag = req.body.tag;
            var type = req.body.type;
            // console.log(req.body);
            // console.log(req.username);
            addMessagesToRoom(rid, msg, tag, type, (response) => {
                res.send(response);
            })
        }
    }, 
    "/users": {
        method: "get",
        handler: (req,res) => {
            var result = getAllUsers();
            res.send(result);
        }
    }
}