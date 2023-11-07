const jwt = require("jsonwebtoken")
const key = "cars"
const authenticate = async (req, res, next) => {
   
    let token = req.headers.authorization
    // console.log({token});
    // res.send(token)
    if (!token) {
        res.send("Token is Missing Please Login First")
    }
    else {
        try {
            let verification = jwt.verify(token, "cars")
            if (verification) {
                // res.send(verification)
                console.log("verification", verification)
                req.body.userID = verification.userId
                next()
            } else {
                res.send("Please Login First")
            }
        } catch (e) {
            res.send(e.message)
        }

    }

}
module.exports = {
    authenticate
};

