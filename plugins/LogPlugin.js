const TextFormat = pocketnode("utils/TextFormat");
const Command = pocketnode("command/Command");
const Player = pocketnode("player/Player");
const PluginManifest = pocketnode("plugin/PluginManifest");
const PluginBase = pocketnode("plugin/PluginBase");

let manifest = new PluginManifest({
    name: "LogPlugin",
    version: "1.0.0",
    api: "1.0.0",
    author: "VaxPex",
    description: "Title Command"
});

class LogPlugin extends PluginBase {

    onEnable() {
        this.getLogger().info(TextFormat.GREEN + "Enabled!");
    }

    onDisable() {
        this.getLogger().info(TextFormat.DARK_RED + "Disabled!");
    }
}

module.exports = {
    manifest: manifest,
    plugin: LogPlugin
};