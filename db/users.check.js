const DATABASE = require('./db');
const users = require('./users.model');

const checkUser = async function checkUserInDB(userID) {

    let user;

    await DATABASE.sync();
    await users.findOne({
        where: {
            telegram_id: userID,
        }
    }).then(async (users) => {
        // console.log('---------- start users ---------')
        // console.log(users);
        // console.log('---------- finish users ---------')

        user = users;
    });

    return user;

}


module.exports = checkUser;