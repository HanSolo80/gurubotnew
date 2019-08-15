import * as dotenv from 'dotenv';
import {WebAdapter} from 'botbuilder-adapter-web';
import {Botkit} from 'botkit';
import {MongoDbStorage} from 'botbuilder-storage-mongodb/lib/MongoDbStorage';
import {BotkitCMSHelper} from 'botkit-plugin-cms';


dotenv.config();

//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the guru bot.

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