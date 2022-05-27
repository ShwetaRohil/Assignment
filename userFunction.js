// const { verifyToken } = require("./jwt");

const { verifyToken } = require("./jwt");

let addUser = function (db, data, token, res) {
    try {
        let verification = verifyToken(token);
        if (verification == "correct") {
            db.collection("users").insertOne(data, (err) => {
                let inserted_id = data._id;

                if (err) {
                    res.send("Error occured while adding the user")
                } else {
                    let obj = {};
                    obj.msg = "User Added";
                    obj.error = 0;
                    obj._id = inserted_id
                    res.send(obj)
                }

            })

        }
        else {
            res.send("Please enter proper token ")
        }


    }
    catch (e) {
        console.log(e)
    }
}

let deleteUser = function (db, id, token, res) {
    try {
        let verification = verifyToken(token);
        if (verification == "correct") {
            db.collection("users").deleteOne({ _id: id }, (err, result) => {
                if (err) {
                    res.send("error occured in deleting the user")
                }
                else {
                    res.send("User deleted")
                }
            })
        } else {
            res.send("please enter proper token")
        }

    }
    catch (e) {
        console.log(e)
    }
}

let updateUser = async function (db, id, name, token, res) {
    try {
        let verification = verifyToken(token);
        if (verification == "correct") {
            let query = { _id: id }
            let newValues = { $set: { name: name } }

            await db.collection("users").updateOne(query, newValues, function (err) {
                if (err) {
                    res.send("Error occured in updating user")
                }
                else {

                    res.send("User Updated");
                }

            }
            )
        }
        else {
            res.send("please enter correct token")
        }
    }
    catch (e) {

    }
}

let getUsers = async function (db, token, res) {
    try {
        let verification = verifyToken(token);
        if (verification == "correct") {
            await db.collection("users").find({}).toArray(function (err, result) {
                if (err) {
                    res.send("Error occured while getting all users data")
                }
                else {
                    res.send(result)
                }
            });
        }
        else {
            res.send('please enter proper token')
        }
    }
    catch (e) {
        console.log(e)
    }
}

let getUserById = async function (db, id, token, res) {
    try {
        let verification = verifyToken(token);
        if (verification == "correct") {
            let doc = await db.collection("users").findOne({ _id: id })
            res.send(doc)
        }
        else {
            res.send("please enter correct token")
        }
    }
    catch (e) {
        console.log(e)
    }
}


module.exports = { addUser, deleteUser, updateUser, getUsers, getUserById }