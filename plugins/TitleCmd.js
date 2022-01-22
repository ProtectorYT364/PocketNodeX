const TextFormat = pocketnode("utils/TextFormat");
const Command = pocketnode("command/Command");
const Player = pocketnode("player/Player");
const PluginManifest = pocketnode("plugin/PluginManifest");
const PluginBase = pocketnode("plugin/PluginBase");

let manifest = new PluginManifest({
    name: "TitleCmd",
    version: "1.0.0",
    api: "1.0.0",
    author: "VaxPex",
    description: "Title Command"
});

class TestTitle extends PluginBase {

    onEnable() {
        this.getLogger().info(TextFormat.GREEN + "Enabled!");
        this.getServer().getCommandMap().registerCommand(new TitleCommand());
    }

    onDisable() {
        this.getLogger().info(TextFormat.DARK_RED + "Disabled!");
    }
}

class TitleCommand extends Command {

    constructor() {
        super("testtitle", "Test Title and Subtitle Command");
    }

    execute(sender, args) {
        if(sender instanceof Player){
            sender.sendTitle("Hello");
            sender.sendSubTitle(sender.getName());
        }else{
            sender.sendMessage("You are not a player");
        }
    }
}

module.exports = {
    manifest: manifest,
    plugin: TestTitle
};