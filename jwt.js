const jwt = require('jsonwebtoken');

const jwtSecretKey = "this is my secret key for security purpose"

function createToken(data) {

    return jwt.sign(data, jwtSecretKey, { expiresIn: '1hr' });

}

function verifyToken(token) {

    try {
        console.log(token)
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return "correct"

        } else {
            return "incorrect"

        }
    } catch (e) {
        console.log(e)
    } 
}

module.exports = { createToken, verifyToken };