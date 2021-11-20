const { DataTypes } = require('sequelize');
const DATABASE = require('./db');

module.exports = DATABASE.define('balance',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    transaction_type: {
        type: DataTypes.STRING,
    },
    transaction_value: {
        type: DataTypes.INTEGER,
    },
    transaction_description: {
        type: DataTypes.TEXT,
    },
    transaction_author: {
        type: DataTypes.STRING,
    },
})