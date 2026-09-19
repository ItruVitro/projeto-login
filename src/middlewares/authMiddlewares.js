const jwt = require("jsonwebtoken");


function tokenVerify(req, res, next) {

    try {
        const authHeaders = req.headers.authorization;

        if (!authHeaders) {
            return res.status(401).json({ erro: "Token está faltando" });
        }

        const BarearToken = authHeaders.split(" ");
        const token = BarearToken[1];

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();

    } catch (error) {
        console.log(error);
        return  res.status(401).json({ erro: "Token inválido"});
    }

};

module.exports = tokenVerify;