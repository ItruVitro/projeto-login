const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {

    try {
        const { name, password, email } = req.body;

        const hash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create(
            { data: { name: name, password: hash, email: email } }
        );

        res.status(201).json("Usuário cadastrado com sucesso");

    }
    catch (e) {
        console.log(`vixi deu erro: ${e}`);
    }

};

async function login(req, res) {


    try {
        const { email, password } = req.body;

        const findUser = await prisma.user.findUnique({ where: { email: email}});
        if(findUser === null){ return res.status(401).json("Usuário não encontrado")};

        const passwordVerified = await bcrypt.compare(password, findUser.password);
        if(!passwordVerified){ return res.status(401).json("Senha errada")}

        const token = jwt.sign({ id: findUser.id },  process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({sucesso: "Login realizado", token: token }); 

    }
    catch (e) {
        console.log(e);
    }

};

async function getProfile(req, res) {

    res.json(req.user);
    
};

module.exports = {createUser, login, getProfile};