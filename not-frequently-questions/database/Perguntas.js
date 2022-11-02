//Conectando com o sequelize
const Sequelize = require('sequelize');
//Conectando com o banco de dados 
const connection = require('./database');

const Pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        AllowNull: false //Não permite que o campo da tabela fique vazio
    },
    descricao: {
        type: Sequelize.TEXT,
        AllowNull: false //Não permite que o campo da tabela fique vazio
    }
});

Pergunta.sync({ force: false }).then(() => { });// 'Force: false' diz a app para não criar uma nova tabela caso ja aja uma 
module.exports = Pergunta
