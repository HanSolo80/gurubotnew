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
const helpers_1 = require('../helpers');
const html_entities_1 = require("html-entities");
class ChuckBot {
    constructor() {
        this.commandMap = new Map();
        this.commandMap.set('chuck', ChuckBot.getCitation);
    }
    getAvailableCommands() {
        return this.commandMap.keys();
    }
    triggerCommand(command) {
        return this.commandMap.get(command);
    }

    static getCitation() {
        return __awaiter(this, void 0, void 0, function* () {
            const fact = yield helpers_1.default.getJSONFromUrl('http://api.icndb.com/jokes/random/');
            return html_entities_1.AllHtmlEntities.decode(fact.value.joke);
        });
    }
}
exports.default = ChuckBot;
//# sourceMappingURL=chuckbot.js.map