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
const sprintf_js_1 = require("sprintf-js");
class BoobBot {
    constructor() {
        this.commandMap = new Map();
        this.commandMap.set('boob', BoobBot.getBoob);
        this.commandMap.set('noise', BoobBot.getNoise);
    }
    getAvailableCommands() {
        return this.commandMap.keys();
    }
    triggerCommand(command) {
        return this.commandMap.get(command);
    }
    static getBoob() {
        return __awaiter(this, void 0, void 0, function* () {
            let boobsUrl = sprintf_js_1.sprintf('http://api.oboobs.ru/boobs/%d/1/rank', BoobBot.randomInt(5000));
            const boob = yield helpers_1.default.getJSONFromUrl(boobsUrl);
            return boob ? 'http://media.oboobs.ru/' + boob[0].preview.replace('_preview', '') : '';
        });
    }
    static getNoise() {
        return __awaiter(this, void 0, void 0, function* () {
            const noise = yield helpers_1.default.getJSONFromUrl(sprintf_js_1.sprintf('http://api.oboobs.ru/noise/%d', BoobBot.noiseCount));
            return noise ? 'http://media.oboobs.ru/' + noise[BoobBot.randomInt(BoobBot.noiseCount)].preview.replace('_preview', '') : '';
        });
    }
    static randomInt(high) {
        return Math.floor(Math.random() * high);
    }
}
BoobBot.noiseCount = 50;
exports.default = BoobBot;
//# sourceMappingURL=boobbot.js.map