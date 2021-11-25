const addUserToDB = require('../db/users.add_user')

const registration = async function userRegister (ctx, startPayload) {
    const phoneNum = ctx.message.contact.phone_number;
    const phoneNumOnlyDigits = phoneNum.replace(/[^0-9]/g, '');

    try {
        await addUserToDB(
            ctx.from.id,
            ctx.from.username,
            ctx.from.first_name,
            ctx.from.last_name,
            phoneNumOnlyDigits,
            startPayload,
            0,
        )
            .then (
                ctx.reply(`Чудово! Ти молодець!`)
            )
            // .then (
                // await console.log(`Income phonenumber: ${phoneNum}`)
                // await console.log(`Cleared phonenumber: ${phoneNumOnlyDigits}`)
                // await ctx.reply(`Номер ${phoneNum} зарегисрирован!`),
            // )

    }
    catch (e) {
        await ctx.reply(`Упс! Щось пішло не так. Спробуй відсканувати QR-код через кілька хвилин.`);
        await console.log('----- start error ----');
        await console.log(e);
        await console.log('----- finish error ----');
    }
}

module.exports = registration;
