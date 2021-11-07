const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
    }
)


sequelize
    .authenticate()
    .then(() => console.log('Connected.'))
    .catch((err) => console.error('Connection error: ', err))



sequelize
    .close()
    .then(() => console.log('Closed.'))
    .catch((err) =>
        console.error('Close connection error: ', err)
    )

