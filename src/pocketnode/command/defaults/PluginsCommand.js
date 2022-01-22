const Command = require("../Command");
const TextFormat = require("../../utils/TextFormat");

class PluginsCommand extends Command {

    constructor() {
        super("plugins", "List the plugins you have enabled on your server.", "pocketnode.command.plugins", ["pl"]);
    }

    execute(sender, args) {
        super.execute(sender, args);
        let list = "";
        let plugins = sender.getServer().getPluginManager().getPlugins();
        plugins.forEach(plugin => {
            list += list.length > 0 ? TextFormat.WHITE + ", " : "";
            list += (plugin.isEnabled() ? TextFormat.GREEN : TextFormat.RED) + plugin.getFullName();
        });

        sender.sendMessage("Plugins (" + plugins.length + "): " + list);
    }
}

module.exports = PluginsCommand;