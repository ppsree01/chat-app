import {getMessages, addMessage} from "./controller.js";

export default {
    "/:userid": {
        method: "get",
        handler: (req,res) => {
            getMessages(req.params.userid, messages => res.send(messages));
        }
    },
    "/add": {
        method: "post",
        handler: (req,res) => {
            if (Math.random() < 0.2) {
                res.status(500).send({
                    success: false,
                });
                return
            }
            var msg = req.body.message;
            var userid = req.body.userid;
            addMessage(userid, msg, () => {res.send({success: true})});
        }
    }
}