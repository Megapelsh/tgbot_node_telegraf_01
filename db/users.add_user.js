const DATABASE = require('./db');
const users = require('./users.model');

const addUserToDB = async function createUser(userID, userName, firstName, lastName, phone, qrcode, balance) {
    await DATABASE.sync();

    await users.findOrCreate({ // возвращает промис с 2 параметрами: модель и создано (булево)
        where: {
            telegram_id: userID
        },
        defaults: {  // set the default properties if it doesn't exist
            username: userName,
            first_name: firstName,
            last_name: lastName,
            telegram_id: userID,
            phone: phone,
            qrcode: qrcode,
            balance: balance,
        }
    })
        .then(function (result) {
            let user = result[0],  //  записываем в переменную вернувшуюся модель (запись юзер)
                created = result[1]  // записываем в переменную создано или нет
            if (!created) {
                console.log(`User ${userName} already registered`);
            } else {
                console.log(`User ${userName} created!`)
            }
            console.log('фраза в конце скрипта');
        })
}

module.exports = addUserToDB;



// await users.create({  // добавление юзера в базу
//     username: ctx.from.username,
//     first_name: ctx.from.first_name,
//     last_name: ctx.from.last_name,
//     telegram_id: ctx.from.id,
// })
//     .then(ctx.reply('User added to DB'))
//     .catch((err) => {
//         console.log(err)
//         ctx.reply('User NOT added to DB!!!')
//     })

