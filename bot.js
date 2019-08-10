//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the guru bot.

// Import Botkit's core features
const { Botkit } = require('botkit');

// Import a platform-specific adapter for slack.

const { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } = require('botbuilder-adapter-slack');

// Load process.env values from .env file
require('dotenv').config();

const adapter = new SlackAdapter({
    clientSigningSecret: process.env.clientSigningSecret,
    botToken: process.env.botToken
});

const controller = new Botkit({
    adapter
});

controller.on('message', async(bot, message) => {
    await bot.reply(message, 'I heard a message!');
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        controller.on('message,direct_message', async (bot, message) => {
            let results = false;
            results = await controller.plugins.cms.testTrigger(bot, message);

            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        });
    }

});


