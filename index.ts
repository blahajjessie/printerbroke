console.log("Hello via Bun!");
import { HelixDB } from "helix-db";

var idno = 0;


type formobject={
    which: string
    who: string
    what: string
    more: string
    name?: string
    mail?: string
    complaints?:string
}
class Problem {
    which: string
    who: string
    what: string
    more: string
    name?: string
    mail?: string
    resolved: boolean
    resolvedby?:string
    submittedStamp:number;
    resolvedStamp?:number;
    id :number;
    complaints?: string;
    constructor(data:formobject){
        this.which = data.which
        this.who = data.who
        this.what = data.what
        this.more = data.more
        this.mail = data.mail
        this.name = data.name
        this.complaints = data.complaints


        this.resolved = false;
        this.submittedStamp = Date.now()
        idno ++;
        this.id = idno;
    }
}

import express from "express";
import * as dotenv from 'dotenv'

const db = new HelixDB();

dotenv.config({ path: '/.env' });

const app = express();
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile( __dirname + '/static/index.html');
});

app.get('/prior.html', (req, res) => {
    console.log(__dirname)
    res.sendFile( __dirname + '/static/prior.html');
});

app.get('/index.html', (req, res) => {
    console.log(__dirname)
    res.sendFile( __dirname + '/static/prior.html');
});

app.get("/issues", (req, res) => {
    res.send(JSON.stringify(db.getAll()));
});

app.get("/resolve/id:/name:", (req, res) => {
    res.send(JSON.stringify(db.getAll));
});

app.post("/printer", (req, res) => {
    // console.log(req)
    console.log("request recieved")
    console.log(req.params);
    console.log(req.body);
    let report = (req.body);
    let err= new Problem(report)
    db.create(err);
    console.log(db.getAll);
    res.send("Thank you! See <a href=prior.html>prior responses</a> or <a href=/>Submit another issue</a>");
    
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});