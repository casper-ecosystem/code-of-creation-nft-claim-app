import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import * as cors from "cors"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(cors());
    app.use(bodyParser.json())

    const redirectMiddleware = (req, res, next) => {
	    // Check if the host starts with "www."
	    if (req.hostname.startsWith("www.")) {
            console.log(`https://${req.hostname.substr(4)}${req.originalUrl}`)
		// Redirect to the same URL without "www."
		    return res.redirect(301, `https://${req.hostname.substr(4)}${req.originalUrl}`);
	    }
	    // If the host doesn't start with "www.", move to the next middleware
	    next();
    };

    // Mount the middleware
    app.use(redirectMiddleware);

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    app.use(express.static("../client/build"));

    // All other routes serve the React app's index.html
    app.get("/", (req, res) => {
	    res.sendFile("../client/build/index.html");
    });

    // start express server
    require('greenlock-express').init({
        packageRoot: "./",
        configDir: "../greenlock.d",
        maintainerEmail: "dylan@casper.network",
        cluster: false
    }).serve(app);


}).catch(error => console.log(error))
