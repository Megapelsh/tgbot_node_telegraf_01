const { DataTypes } = require('sequelize');
const DATABASE = require('./db');

module.exports = DATABASE.define('user',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    username: {
        type: DataTypes.STRING,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    telegram_id: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
    },
    qrcode: {
        type: DataTypes.STRING,
    }
})