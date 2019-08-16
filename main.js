"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const botbuilder_adapter_web_1 = require("botbuilder-adapter-web");
const botkit_1 = require("botkit");
const MongoDbStorage_1 = require("botbuilder-storage-mongodb/lib/MongoDbStorage");
const botkit_plugin_cms_1 = require("botkit-plugin-cms");
const chuckbot_1 = require("./chuckbot");
dotenv.config();
//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |
// This is the main file for the guru bot.
let storage = null;
if (process.env.MONGO_URI) {
    storage = new MongoDbStorage_1.MongoDbStorage({
        url: process.env.MONGO_URI,
    });
}
const adapter = new botbuilder_adapter_web_1.WebAdapter({});
const controller = new botkit_1.Botkit({
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
    controller.usePlugin(new botkit_plugin_cms_1.BotkitCMSHelper({
        uri: process.env.cms_uri,
        token: process.env.cms_token,
    }));
}
// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');
    const chuckbot = new chuckbot_1.default();
    for (let command of chuckbot.getAvailableCommands()) {
        controller.hears(command, 'message', (bot, message) => __awaiter(this, void 0, void 0, function* () {
            const reply = yield chuckbot.triggerCommand(command);
            yield bot.reply(message, reply);
        }));
    }
    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        controller.on('message,direct_message', (bot, message) => __awaiter(this, void 0, void 0, function* () {
            let results = false;
            results = yield controller.plugins.cms.testTrigger(bot, message);
            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        }));
    }
});
//# sourceMappingURL=main.js.map