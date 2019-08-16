interface BotFeature {
	commandMap: Map<string, StringPromiseFunction>

	getAvailableCommands(): IterableIterator<string>;

	triggerCommand(command: string): StringPromiseFunction;
}