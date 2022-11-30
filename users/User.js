const Sequelize = require('sequelize')

const connection = require('../database/database');

const User = connection.define('user', {
    name: {
        type: Sequelize.STRING,
        AllowNull: false
    },
    email: {
        type: Sequelize.STRING,
        AllowNull: false
    },
    password: {
        type: Sequelize.STRING,
        AllowNull: false
    }

})

User.sync({force:false}).then(() => {})

module.exports = User;