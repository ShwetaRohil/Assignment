const {
    MongoClient,
    ObjectId
} = require("mongodb");

const uri = "mongodb+srv://shweta:mongodb25@cluster0.xb5e8.mongodb.net/test";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = client.db("users");

const { createToken } = require("./jwt");

const express = require('express');

const app = express();

const cors=require("cors")

app.use(cors())

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());



const port = 3000;

const users = require("./userFunction");

client.connect(() => {

    console.log("connected to mongodb");

    app.listen(port, () => console.log(`app listening on port ${port}!`))

    

    app.post("/login", async (req, res) => {
        try {
            let username = req.body.username;
            let password = req.body.password;

            if (username = "admin" && password == "admin") {
                let token=createToken({username:"admin"})
                res.send("Login successful your token is : " + token);
            }
            else {
                res.send("login unsuccessful")
            }
        }
        catch (e) {
            console.log(e)
        }
    })



    app.post("/addUser", async (req, res) => {
        let data = req.body;
        let token= req.headers.token;
        data.createdAt = new Date().toDateString();
        await users.addUser(db, data, token, res);
    })

    app.get("/getAllUsers", async (req, res) => {
        let token= req.headers.token;
        await users.getUsers(db, token, res);
    })

    app.get("/getUserById", async (req, res) => {
        let id = ObjectId(req.query.id);
        let token= req.headers.token;
        await users.getUserById(db, id, token, res);

    })

    app.delete("/deleteUser", async (req, res) => {
        let id = ObjectId(req.body.id);
        let token= req.headers.token;
        await users.deleteUser(db, id, token, res)
    })

    app.put("/updateUser", async (req, res) => {
        let id = ObjectId(req.body.id);
        let token= req.headers.token;
        let name = req.body.name;
        await users.updateUser(db, id, name, token, res)
    })

}
)
