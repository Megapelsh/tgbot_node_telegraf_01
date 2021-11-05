const { Telegraf } = require('telegraf');
require('dotenv').config();

const constants = require('./const');
const commands = constants.commandsList;

const bot = new Telegraf(process.env.BOT_TOKEN);

// bot.settings(ctx => {
//     ctx.setMyCommands([
//         {
//             command: '/start',
//             description: 'Start bot',
//         },
//         {
//             command: '/help',
//             description: 'Bot commands list',
//         },
//         {
//             command: '/settings',
//             description: 'Just empty command',
//         },
//     ])
// })


bot.start(async (ctx) => {
    ctx.reply(`Hey, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'stranger'}!`);
    ctx.setMyCommands(commands);
});

bot.help((ctx) => {
    let printedCommandList = '';
    for (let key in commands) {
        printedCommandList += commands[key].command + "\n";
    }
    ctx.reply(printedCommandList);
});

bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))