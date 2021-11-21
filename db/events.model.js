const { DataTypes } = require('sequelize');
const DATABASE = require('./db');

module.exports = DATABASE.define('events',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    starts: {
        type: DataTypes.DATE,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    speaker: {
        type: DataTypes.STRING,
    },
    author: {
        type: DataTypes.STRING,
    },
})