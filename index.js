const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf');
const fetch = require("node-fetch");
require('dotenv').config();

const DATABASE = require('./db/db');
const users = require('./db/users.model');

const constants = require('./const');
const commands = constants.commandsList;

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands(commands);

bot.start(async (ctx) => {
    ctx.reply(`Hey, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'stranger'}!`);
});

bot.settings(async (ctx) => {
    ctx.reply('hohohoO settings');

    let url = 'https://multicode.eu/mapi.php?f=CUser_CheckAuthorization&out=json&dt[login]=pelsh1&dt[password]=322223';
    let username = process.env.MULTICODE_LOGIN;
    let password = process.env.MULTICODE_PASSWORD;

    await fetch(url, {
        method:'GET',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        }})
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(await function () {
            console.log('fetch error')
        })

        // картинку кода получаем по ссылке:
        // http://multicode.eu/qrCode/?f=p&data=https://dsqr.eu/?q=1_1633959341_pRfyB71D63
        // f=p   png
        // f=s   svg

})


bot.command('qrcode', async (ctx) => {
    ctx.reply('Your code:')

    // скачивание и отправка в чат бота изображение кода
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



bot.on("contact", ctx => {
    const phoneNum = ctx.message.contact.phone_number;
    ctx.reply(`Номер ${phoneNum} зарегисрирован!`);
    console.log(phoneNum);
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


bot.hears('auth', async (ctx) => {
    await DATABASE.sync();
    await users.create({
        username: ctx.from.username,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        telegram_id: ctx.from.id,
    })
        .then(ctx.reply('User added to DB'))
        .catch((err) => {
            console.log(err)
            ctx.reply('User NOT added to DB!!!')
        })
})


bot.hears('check', async (ctx) => {
    await DATABASE.sync();
    await users.findOne({
        where: {
            telegram_id: ctx.from.id
        }
    }).then(async (users) => {
        console.log(users);
    });
});


bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))