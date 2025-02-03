const jsonwebtoken = require('jsonwebtoken')

const verifyToken = (req, res, next) => {

    const token=req.headers.authorization.split(" ")[1]
    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
    jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
        req.user = user
        next()
    })
}

module.exports = verifyToken