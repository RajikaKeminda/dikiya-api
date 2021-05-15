var jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next) {

    const authHeaders = req.headers['authentication']

    if (!authHeaders) return res.json({ msg: "invalid authentication 1" })

    const token = authHeaders.split(' ')[1]

    if (!token) return res.json({ msg: "invalid authentication 2" })
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
        if (err) return res.json(err)
        req.user = data
        next()
    })
}