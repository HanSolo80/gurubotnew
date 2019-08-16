interface BotFeature {
	commandMap: Map<string, Promise<string>>

	getAvailableCommands(): IterableIterator<string>;

	triggerCommand(command: string): Promise<string>;
}