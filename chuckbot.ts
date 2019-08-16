import {Botkit} from 'botkit';
import Helpers from './helpers';

import {AllHtmlEntities as entities} from 'html-entities';

export default class ChuckBot implements BotFeature {

	commandMap: Map<string, Promise<string>>;

	constructor() {
		this.commandMap = new Map();
		this.commandMap.set('chuck', this.getCitation());
	}

	getAvailableCommands(): IterableIterator<string> {
		return this.commandMap.keys();
	}

	triggerCommand(command: string): Promise<string> {
		return this.commandMap.get(command);
	}

	private async getCitation(): Promise<string> {
		const fact = await Helpers.getJSONFromUrl('http://api.icndb.com/jokes/random/');
		return entities.decode(fact.value.joke);
	}

}
