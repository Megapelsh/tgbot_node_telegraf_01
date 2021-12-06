const { Telegraf, Markup, Composer, Scenes, session } = require('telegraf');
require('dotenv').config();

const startHandler = require('./handlers/start')
const registerHandler = require('./handlers/registration')
const getQRCodeHandler = require('./handlers/get_qrcode')
const createEventHandler = require('./handlers/create_new_event')

const checkUser = require('./db/users.check')

const constants = require('./const');
const commands = constants.commandsList;

const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands(commands)
    .then((res) => {
        console.log('Bot commands created');
    });


// помещаем в сессию стартПейлоад и присваиваем значение по-умолчанию
bot.session ??= { startPayload: '' }


bot.start(async (ctx) => {
    bot.session.startPayload = ctx.startPayload;
    await startHandler(ctx, bot.session.startPayload);
    await console.log(bot.session.startPayload);
});


bot.on("contact", async (ctx) => {
    await registerHandler(ctx, bot.session.startPayload);
    if (bot.session.startPayload !== '') {
        await ctx.reply('Твій код на відвідування цього заходу:');
        await getQRCodeHandler(ctx, bot.session.startPayload);
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


// ------- scene -----------

const startWizard = new Composer()
startWizard.on('text', async (ctx) => {
    await ctx.reply('Say your name:')
    return ctx.wizard.next()
})

const menuScene = new Scenes.WizardScene('sceneWizard', startWizard)

const stage = new Scenes.Stage([menuScene])
bot.use(stage.middleware())

bot.command('event', (ctx) => ctx.scene.enter('sceneWizard'))


// ------- /scene -----------


bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))


bot.use(session())

bot.launch()
    .then(res => console.log('Bot started!'))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))