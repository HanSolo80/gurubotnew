import * as dotenv from 'dotenv';
import {WebAdapter} from 'botbuilder-adapter-web';
import {Botkit} from 'botkit';
import {MongoDbStorage} from 'botbuilder-storage-mongodb/lib/MongoDbStorage';
import ChuckBot from './features/chuckbot';
import BoobBot from './features/boobbot';

dotenv.config();

let storage = null;
if (process.env.MONGO_URI) {
	storage = new MongoDbStorage({
		url: process.env.MONGO_URI,
	});
}

const adapter = new WebAdapter({});

const controller = new Botkit({
	adapterConfig: {},
	dialogStateProperty: '',
	disable_console: false,
	disable_webserver: false,
	webserver: undefined,
	webserver_middlewares: [],
	webhook_uri: '/api/messages',

	adapter: adapter,

	storage
});

if (process.env.cms_uri) {
	// @ts-ignore
	controller.usePlugin(new BotkitCMSHelper({
		uri: process.env.cms_uri,
		token: process.env.cms_token,
	}));
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

	// load traditional developer-created local custom feature modules
	controller.loadModules(__dirname + '/webfeatures');

	const chuckbot = new ChuckBot();
	const boobbot = new BoobBot();

	const activeBots: BotFeature[] = [chuckbot, boobbot];
	for (let activeBot of activeBots) {
		for (let command of activeBot.getAvailableCommands()) {
			controller.hears(command, 'message', async (bot, message) => {
				const replyFunction = activeBot.triggerCommand(command);
				const reply = await replyFunction();
				await bot.reply(message, reply);
			});
		}
	}

});