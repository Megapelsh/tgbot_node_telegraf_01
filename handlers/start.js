const { Markup, session } = require('telegraf');
const checkUser = require('../db/users.check')

const startHandler = async function start (ctx) {
    await ctx.reply(`Привіт, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнайомцю'}!`);

    const userExists = await checkUser(ctx.from.id);
    if (!userExists) {
        await ctx.reply('Для початку давй познайомимось. Я - бот. Допомагаю своїм користувачам відвідувати цікаві заходи. Для того, щоб приєднатися до нашої спільноти, тобі потрібно зареєструватися. Натисни кнопку "Відправити номер телефону" у нижній частині екрану.', Markup.keyboard([
            [
                {
                    text: "Відправити номер телефону",
                    request_contact: true
                }
            ]
        ]).oneTime().resize());
    }
    else {
        await ctx.reply('User exists');
        await console.log('User exists!');
    }

    // ctx.session.startPayload = ctx.startPayload;

    if (ctx.startPayload) {
        // await updateQR(ctx.startPayload, ctx.from.id);
        await console.log(ctx.startPayload); // выводим гет-параметр из ссылки на бот
        await ctx.reply(ctx.startPayload);

    }
// await console.log(ctx.message);
    await console.log(ctx);
}

module.exports = startHandler;

