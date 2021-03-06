const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
        
    } catch (err) {

        return res.json({
            msg : "auth failed"
        });
    }
}