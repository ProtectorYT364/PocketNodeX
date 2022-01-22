const TextFormat = pocketnode("utils/TextFormat");
const Command = pocketnode("command/Command");
const Player = pocketnode("player/Player");
const PluginManifest = pocketnode("plugin/PluginManifest");
const PluginBase = pocketnode("plugin/PluginBase");

let manifest = new PluginManifest({
    name: "MessageCmd",
    version: "1.0.0",
    api: "1.0.0",
    author: "VaxPex",
    description: "Message Command"
});

class MessageCmd extends PluginBase {

    onEnable() {
        this.getLogger().info(TextFormat.GREEN + "Enabled!");
        this.getServer().getCommandMap().registerCommand(new MsgCmd());
    }

    onDisable() {
        this.getLogger().info(TextFormat.DARK_RED + "Disabled!");
    }
}

class MsgCmd extends Command {

    constructor() {
        super("msgcmd", "Send Message Command");
    }

    execute(sender, args) {
        if(sender instanceof Player){
            sender.sendMessage("You are a player");
        }else{
            sender.sendMessage("You are not a player");
        }
    }
}

module.exports = {
    manifest: manifest,
    plugin: MessageCmd
};