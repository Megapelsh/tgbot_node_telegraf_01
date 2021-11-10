const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf');
const fetch = require("node-fetch");
require('dotenv').config();

const constants = require('./const');
const commands = constants.commandsList;

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands(commands);

bot.start(async (ctx) => {
    ctx.reply(`Hey, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'stranger'}!`);
    // ctx.setMyCommands(commands);
    // bot.telegram.setMyCommands(commands);
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

    await console.log(ctx);

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
  
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))