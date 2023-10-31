import * as express from "express";
import * as dotenv from "dotenv";
import * as cors from "cors";
import bodyParser = require("body-parser");
import path = require("path");
import "reflect-metadata";
import { DataSource } from "typeorm";
import { MongoDataSource } from "./DataSource";
import { TestRouter } from "./routes/TestRouter";
import { ContactRouter } from "./routes/ContactRouter";

class App {
  public app: express.Application;
  public corsOptions: cors.CorsOptions;
  public router: express.Router;

  constructor() {
    // set variables
    this.app = express();
    this.router = express.Router();

    // config envirnoment file
    dotenv.config({
      path: path.resolve(__dirname, "../.env"),
    });

    // setting uses
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // initialize resources
    this.initializeRoutes();

    // initialize database
    const Mongo: DataSource = MongoDataSource;
    Mongo.initialize();
  }

  private initializeRoutes() {
    this.app.use(bodyParser.json());
    this.app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        console.log(
          `Received ${req.method} request from ${req.ip} to ${req.originalUrl}`
        );
        next(); // Continue processing the request
      }
    );

    const corsOptions = {
      "origin": "*",
      "allowedHeaders": [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "X-Access-Token",
          "Access-Control-Allow-Origin"
      ],
      "credentials": false,
      "methods": "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      "preflightContinue": false
    }

    this.app.use(cors(corsOptions));
    this.app.use("/", this.router);

    new TestRouter().routes(this.router);
    new ContactRouter().routes(this.router);
  }

  public listen(): void {
    this.app.listen();
  }
}
export default new App().app;
