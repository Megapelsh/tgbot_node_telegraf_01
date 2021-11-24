const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf');
const fetch = require("node-fetch");
require('dotenv').config();

const startHandler = require('./handlers/start')

const addUserToDB = require('./db/users.add_user')
const updateQR = require('./db/users.update')

const constants = require('./const');
const commands = constants.commandsList;

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands(commands)
    .then((res) => {
            console.log('Bot commands created');
    });

bot.session ??= { startPayload: '' } // в сессию положили стартПейлоад и присвоили значение по-умолчанию

bot.start(async (ctx) => {
    await startHandler(ctx);
    bot.session.startPayload = ctx.startPayload;
    await console.log(bot.session.startPayload);
});

bot.settings(async (ctx) => {
    ctx.reply('hohohoO settings');

    let url = 'https://multicode.eu/mapi.php?f=CUser_CheckAuthorization&out=json&dt[login]=pelsh1&dt[password]=322223';
    let username = process.env.MULTICODE_LOGIN;
    let password = process.env.MULTICODE_PASSWORD;

    await fetch(url, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
        }})
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(await function () {
            console.log('fetch error')
        })
})


bot.command('qrcode', async (ctx) => {
    ctx.reply('Your code:')

    // скачивание и отправка в чат бота изображение кода
    // картинку кода получаем по ссылке:
    // http://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=1_1633959341_pRfyB71D63

    // f=p   png
    // f=s   svg

    // https://multicode.eu/qrCode/?f=p&data=zahid%20--%20Vistavka%20vyazanih%20gamanciv%20--%20vidviduvach%20--%20+380%2098%20563%202147%20--%20dostup%20--%20+++%20DOZVOLENO%20+++
    // пример ссылки с разрешением доступа
    // текст необходимо транслитерировать!!!

    let url='https://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=1_1633959341_pRfyB71D63';

    await fetch(url)
        .then(response => {
            ctx.replyWithPhoto(response)
            console.log('pic sent')
        })
        .catch(await function () {
            console.log('---------- start error ---------')
            console.log('fetch error')
            console.log('--------- finish error ---------')
        })
    // конец отправки кода в чат

})


bot.help((ctx) => {
    let printedCommandList = '';
    for (let key in commands) {
        printedCommandList += commands[key].command + "\n";
    }
    ctx.reply(printedCommandList);
});

bot.command("reg", (ctx) => {

    ctx.reply("Отправить номер телефона для регистрации", Markup.keyboard([
        [
            {
                text: "Отправить номер телефона",
                request_contact: true
            }
        ]
    ]).oneTime().resize());

});


bot.on("contact", async (ctx) => {
    const phoneNum = ctx.message.contact.phone_number;
    const phoneNumOnlyDigits = phoneNum.replace(/[^0-9]/g, '');

    try {
        await addUserToDB(
            ctx.from.id,
            ctx.from.username,
            ctx.from.first_name,
            ctx.from.last_name,
            phoneNumOnlyDigits,
            bot.session.startPayload,
        )
            .then (
                ctx.reply(`Чудово! Ти молодець. Тепер можеш обрати бажану дію`)
            )
            .then (
                await console.log(`Income phonenumber: ${phoneNum}`),
                await console.log(`Cleared phonenumber: ${phoneNumOnlyDigits}`),
                // await ctx.reply(`Номер ${phoneNum} зарегисрирован!`),
            )

    }
    catch (e) {
        await ctx.reply(`Упс! Щось пішло не так. Спробуй відсканувати QR-код через кілька хвилин.`);
        await console.log('----- start error ----');
        await console.log(e);
        await console.log('----- finish error ----');
    }

})


bot.hears('check', async (ctx) => {

    const userExists = await checkUser(ctx.from.id);
    if (userExists) {
        await ctx.reply('User exists');
    }
    else {
        await ctx.reply('User NOT exists');
    }
    // await console.log(userExists);
});



bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))

bot.use(session())
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))