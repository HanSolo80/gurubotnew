import Helpers from '../helpers';
import {sprintf} from 'sprintf-js';

export default class BoobBot implements BotFeature {

	commandMap: Map<string, StringPromiseFunction>;
	private static noiseCount = 50;

	constructor() {
		this.commandMap = new Map();
		this.commandMap.set('boob', BoobBot.getBoob);
		this.commandMap.set('noise', BoobBot.getNoise);
	}

	getAvailableCommands(): IterableIterator<string> {
		return this.commandMap.keys();
	}

	triggerCommand(command: string): StringPromiseFunction {
		return this.commandMap.get(command);
	}

	private static async getBoob(): Promise<string> {
		let boobsUrl = sprintf('http://api.oboobs.ru/boobs/%d/1/rank', BoobBot.randomInt(5000));
		const boob = await Helpers.getJSONFromUrl(boobsUrl);
		return boob ? 'http://media.oboobs.ru/' + boob[0].preview.replace('_preview', '') : '';
	}

	private static async getNoise(): Promise<string> {
		const noise = await Helpers.getJSONFromUrl(sprintf('http://api.oboobs.ru/noise/%d', BoobBot.noiseCount));
		return noise ? 'http://media.oboobs.ru/' + noise[BoobBot.randomInt(BoobBot.noiseCount)].preview.replace('_preview', '') : '';
	}

	private static randomInt(high) {
		return Math.floor(Math.random() * high);
	}
}
