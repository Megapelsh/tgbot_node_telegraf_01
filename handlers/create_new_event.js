const { Markup, Composer, Scenes, session } = require('telegraf');


const addEventToDB = (bot, ctx) => {

    // const createEventScene = new Scenes.WizardScene('createEventWizard',
    //     getEventName
    //     // getEventDate,
    //     // getEventTime,
    //     // getEventSpeaker,
    //     // getEventBasicPrice,
    //     // getEventSubscriptionPrice
    // );
    //
    // ctx.scene.enter('createEventWizard');
    //
    // const getEventName = new Composer();
    // getEventName.on('text', async (ctx) => {
    //     await ctx.reply('Введи назву заходу:');
    //     // return ctx.wizard.next();
    //     return ctx.scene.leave();
    // })
    //
    //
    //
    // const stage = new Scenes.Stage([createEventScene])
    // bot.use(stage.middleware())





}

module.exports = addEventToDB;