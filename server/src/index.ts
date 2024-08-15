import express from "express";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from 'cors'
import helmet from 'helmet';
import morgan from 'morgan';

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors( ));

// Routes
app.get("/hello", (req, res) => {
    res.send("We are here baby")
})

// Server

const port = process.env.PORT  || 5000;

app.listen(port, () => {
    console.log(`Sever starteed on port: ${port}`);
    
})