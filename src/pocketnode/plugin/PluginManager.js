const FileSystem = require("fs");
const Path = require("path");

const Plugin = require("./Plugin");
const PluginLoader = require("./PluginLoader");
const PluginManifest = require("./PluginManifest");

// const Listener = require("../event/Listener");
// const EventManager = require("../event/EventManager");

class PluginManager {
    constructor(server) {
        this.initVars();
        this.server = server;
    }

    initVars() {
        this.server = null;
        this.plugins = new Map();
        this.loaders = new Map();
        // this.eventManager = new EventManager();
    }

    getPlugin(name) {
        if (this.plugins.has(name)) {
            return this.plugins.get(name);
        }
        return null;
    }

    registerLoader(loader) {
        loader = new loader(this.server);
        if (loader instanceof PluginLoader) {
            this.loaders.set(loader.constructor.name, loader);
            return true;
        } else {
            return false;
        }
    }

    getPlugins() {
        return Array.from(this.plugins.values());
    }

    loadPlugin(path, loaders) {
        loaders = loaders || this.loaders;
        for (let [, loader] of loaders) {
            if (loader.getPluginFilters().test(Path.basename(path))) {
                let manifest = loader.getPluginManifest(path);
                if (manifest instanceof PluginManifest) {
                    let plugin;
                    try {
                        if ((plugin = loader.loadPlugin(path)) instanceof Plugin) {
                            this.plugins.set(plugin.getName(), plugin);
                            return plugin;
                        }
                    } catch (e) {
                        this.server.getLogger().critical("Error trying to load " + manifest.getName());
                        this.server.getLogger().logError(e);
                        return null;
                    }
                }
            }
        }
        return null;
    }

    loadPlugins(directory, newLoaders) {
        if (FileSystem.lstatSync(directory).isDirectory()) {
            let plugins = new Map();
            let loadedPlugins = new Map();

            let loaders = new Map();

            if (Array.isArray(newLoaders)) {
                newLoaders.forEach((loader, key) => {
                    if (this.loaders.has(key)) {
                        loaders.set(key, this.loaders.get(key));
                    }
                });
            } else {
                loaders = this.loaders;
            }

            for (let [, loader] of loaders) {
                FileSystem.readdirSync(directory).forEach(file => {
                    if (!loader.getPluginFilters().test(file)) return;

                    file = directory + file;

                    try {
                        let manifest = loader.getPluginManifest(file);
                        if (manifest instanceof PluginManifest) {
                            let name = manifest.getName();
                            if (name.indexOf("pocketnode") !== -1 || name.indexOf("minecraft") !== -1 || name.indexOf("mojang") !== -1) {
                                this.server.getLogger().error("Plugin name contains invalid keyword!");
                                return;
                            } else if (name.indexOf(" ") !== -1) {
                                this.server.getLogger().warning("Warning for '" + name + "': It is discouraged to have a plugin with a space in the name!");
                            }

                            if (plugins.has(name) || this.getPlugin(name) instanceof Plugin) {
                                this.server.getLogger().error("There is already another plugin with the name '" + name + "'");
                                return;
                            }

                            if (!this.isCompatibleApi(manifest.getCompatibleApis())) {
                                this.server.getLogger().error("Cannot load '" + name + "': Incompatible Api!");
                                return;
                            }

                            plugins.set(name, file);
                        }
                    } catch (e) {
                        this.server.getLogger().error("There was an error loading a plugin.");
                        this.server.getLogger().logError(e);
                    }
                });
            }

            while (plugins.size > 0) {
                for (let [name, file] of plugins) {
                    plugins.delete(name);
                    let plugin;
                    if ((plugin = this.loadPlugin(file, loaders)) instanceof Plugin) {
                        loadedPlugins.set(name, plugin);
                    } else {
                        this.server.getLogger().critical("Unable to load plugin: " + name);
                    }
                }
            }

            return loadedPlugins;
        } else {
            return [];
        }
    }

    isCompatibleApi(versions) {
        for (let i in versions) {
            let version = versions[i];
            if (version === this.server.getApiVersion()) return true;

            let pluginApi = version.split("-").concat([""]);
            let serverApi = this.server.getApiVersion().split("-").concat([""]);

            if (pluginApi[1].toUpperCase() !== serverApi[1].toUpperCase()) {
            }

            let pluginNumbers = pluginApi[0].split(".").concat(["0", "0"]).map(v => parseInt(v));
            let serverNumbers = serverApi[0].split(".").map(v => parseInt(v));

            if (pluginNumbers[0] !== serverNumbers[0]) continue;

            if (pluginNumbers[1] > serverNumbers[1]) continue;

            return true;
        }
        return false;
    }

    isPluginEnabled(plugin) {
        if (plugin instanceof Plugin && this.plugins.has(plugin.getName())) {
            return plugin.isEnabled();
        } else {
            return false;
        }
    }

    enablePlugin(plugin) {
        if (!(plugin instanceof Plugin)) return;
        if (!plugin.isEnabled()) {
            plugin.getPluginLoader().enablePlugin(plugin);
        }
    }

    disablePlugin(plugin) {
        if (!(plugin instanceof Plugin)) return;
        if (plugin.isEnabled()) {
            plugin.getPluginLoader().disablePlugin(plugin);
            plugin.onDisable();
        }

        //todo: cancel tasks. remove perms, handlers. etc.
    }

    enablePlugins() { //todo: startup or postworld
        this.plugins.forEach(plugin => {
            if (!plugin.isEnabled()) {
                this.enablePlugin(plugin);
            }
        });
    }

    disablePlugins() {
        this.getPlugins().forEach(plugin => {
            this.disablePlugin(plugin);
        });
    }

    registerListener(listener, plugin) {
        // CheckTypes([Listener, listener], [Plugin, plugin]);

        // return this.eventManager.registerListener(listener, plugin);
    }

    /**
     * @param  {Event} event
     */
    callEvent(event) {
        // return this.eventManager.callEvent(event.getName(), event);
    }
}

module.exports = PluginManager;
