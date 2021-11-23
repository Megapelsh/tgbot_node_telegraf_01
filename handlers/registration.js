const { Markup, Composer, Scenes, session } = require('telegraf');

const registrationScene = new Scenes.WizardScene('registerScene')

const state = new Scenes.Stage([registrationScene])