const DATABASE = require('./db');
const users = require('./users.model');

const updateUserQRCode = async function updateQR (codeValue, telegram_id) {
    await DATABASE.sync();

    await users.update({ qrcode: codeValue }, {
        where: {
            telegram_id: telegram_id,
        }
    })
        .then((res) => {
            console.log(res);
        })
};

module.exports = updateUserQRCode;