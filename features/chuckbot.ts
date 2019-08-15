import {Botkit} from 'botkit';
import Helpers from '../helpers'

import {AllHtmlEntities as entities} from 'html-entities';

module.exports = (controller: Botkit) => {
    controller.hears('\\+chuck', 'message', async (bot, message) => {
		await Helpers.getJSONFromUrl("http://api.icndb.com/jokes/random/").then(async (fact) => {
            await bot.reply(message, entities.decode(fact.value.joke));
        });
    });
};
