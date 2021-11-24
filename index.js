const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf');
require('dotenv').config();

const startHandler = require('./handlers/start')
const registerHandler = require('./handlers/registration')
const getQRCodeHandler = require('./handlers/qrcode_receiving')

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


bot.on("contact", async (ctx) => {
    await registerHandler(ctx, bot.session.startPayload);
    if (bot.session.startPayload !== '') {
        await ctx.reply('Твій код на відвідування цього заходу:');
        await getQRCodeHandler(ctx);
    }
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


bot.help((ctx) => {
    let printedCommandList = '';
    for (let key in commands) {
        printedCommandList += commands[key].command + "\n";
    }
    ctx.reply(printedCommandList);
});


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