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
const helpers_1 = require("../helpers");
const html_entities_1 = require("html-entities");
module.exports = (controller) => {
    controller.hears('\\+chuck', 'message', (bot, message) => __awaiter(this, void 0, void 0, function* () {
        yield helpers_1.default.getJSONFromUrl("http://api.icndb.com/jokes/random/").then((fact) => __awaiter(this, void 0, void 0, function* () {
            yield bot.reply(message, html_entities_1.AllHtmlEntities.decode(fact.value.joke));
        }));
    }));
};
//# sourceMappingURL=chuckbot.js.map