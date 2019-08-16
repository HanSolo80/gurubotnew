import Helpers from '../helpers';

import {AllHtmlEntities as entities} from 'html-entities';

export default class ChuckBot implements BotFeature {

	commandMap: Map<string, StringPromiseFunction>;

	constructor() {
		this.commandMap = new Map();
		this.commandMap.set('chuck', ChuckBot.getCitation);
	}

	getAvailableCommands(): IterableIterator<string> {
		return this.commandMap.keys();
	}

	triggerCommand(command: string): StringPromiseFunction {
		return this.commandMap.get(command);
	}

	private static async getCitation(): Promise<string> {
		const fact = await Helpers.getJSONFromUrl('http://api.icndb.com/jokes/random/');
		return entities.decode(fact.value.joke);
	}

}
