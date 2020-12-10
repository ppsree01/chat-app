import express from 'express';
import _ from 'lodash';
import {initializeMongo} from "./mongo-init.js"
import routes from "./routes.js";
const apps = express();
const port = 8080;

initializeMongo(() => {
    console.log("Entered");
    apps.listen(port, () => {
        console.log(`apps listening at port ${port}`);
    })
});

apps.use(express.json());
apps.use((req, res, next) => {
    setTimeout(() => {
        next();
    }, 500);
});
apps.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

_.forEach(routes, ({method, handler}, url) => {
    apps[method](url, handler);
})