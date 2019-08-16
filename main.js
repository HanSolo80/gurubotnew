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
const chuckbot_1 = require("./features/chuckbot");
const boobbot_1 = require("./features/boobbot");
dotenv.config();
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
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.cms_uri,
        token: process.env.cms_token,
    }));
}
// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/webfeatures');
    const chuckbot = new chuckbot_1.default();
    const boobbot = new boobbot_1.default();
    const activeBots = [chuckbot, boobbot];
    for (let activeBot of activeBots) {
        for (let command of activeBot.getAvailableCommands()) {
            controller.hears(command, 'message', (bot, message) => __awaiter(this, void 0, void 0, function* () {
                const replyFunction = activeBot.triggerCommand(command);
                const reply = yield replyFunction();
                yield bot.reply(message, reply);
            }));
        }
    }
});
//# sourceMappingURL=main.js.map