const { Markup, session } = require('telegraf');
const checkUser = require('../db/users.check')
const getQRCodeHandler = require('./get_qrcode')

const startHandler = async function start (ctx, event) {
    await ctx.reply(`Привіт, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнайомцю'}!`);

    const user = await checkUser(ctx.from.id);
    if (!user) {
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
        if (ctx.startPayload) {   // если задан startPayload,
            await ctx.reply('Твій код на відвідування цього заходу:');
            await getQRCodeHandler(ctx, event, user.phone);
        }
        else {
            await ctx.reply('Обери бажану дію з меню, якого поки що немає, ги-ги')
        }
    }

    // await console.log(ctx);
}

module.exports = startHandler;

