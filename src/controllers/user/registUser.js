const bcrypt = require('bcrypt');

const checkEmailRegistered = require('../../utils/checkFunctions/checkUser/checkUserEmailRegistered');
const validateUserDataRegister = require('../../utils/validations/validateUserDataRegister');
const insertUserIntoDatabase = require('../../utils/insertFunctions/insertUserIntoDatabase');

const userRegistration = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await validateUserDataRegister(nome, email, senha)
        
        await checkEmailRegistered(email)

        const encryptedPassword = await bcrypt.hash(senha, 10)

        const register = await insertUserIntoDatabase(nome, email, encryptedPassword)

        const { senha: _, ...dataUser } = register;

        return res.status(201).json(dataUser);

    } catch (error) {
        return res.status(error.code).json(error.message);
    }
}

module.exports = {
    userRegistration
}