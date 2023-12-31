const checkEmailClientRegist = require('../../utils/checkFunctions/checkClient/checkEmailClientRegist');
const checkCpfRegistered = require('../../utils/checkFunctions/checkClient/checkClientCpfRegistered');
const insertClientIntoDatabase = require('../../utils/insertFunctions/insertClientIntoDatabase');

const registClient = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
        await checkEmailClientRegist(email);
        await checkCpfRegistered(cpf);
        const client = await insertClientIntoDatabase(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);

        return res.status(201).json(client);

    } catch (error) {
        return res.status(error.code).json(error.message);
    }
}

module.exports = {
    registClient
}