//importando o sequelize
const Sequelize = require('sequelize');

//criando a conexão com o banco de dados 
const connection = new Sequelize('perguntas_e_resposta'/*database name*/, 'root' /*user*/, '123456' /*password*/, {
    host: 'localhost', //o servidor
    dialect:'mysql', //e o tipo de banco
});

//exportando a conexão
module.exports = connection;
