"use strict";
const Creature = pocketnode("entity/Creature");
//const ProjectileSource = pocketnode("entity/projectile/ProjectileSource");
//const InventoryHolder = pocketnode("inventory/InventoryHolder");
const Skin = pocketnode("entity/Skin");
const Player = pocketnode("player/Player");
const PlayerSkinPacket = pocketnode("network/minecraft/protocol/PlayerSkinPacket");
const CompoundTag = pocketnode("nbt/tag/CompoundTag");

class Human extends Creature /*implements ProjectileSource, InventoryHolder*/{

    initVars() {
        this._inventory = null;

        this._enderChestInventory = null;

        this._uuid = null;
        this._rawUUID = null;

        this.width = 0.6;
        this.height = 1.8;
        this.eyeHeight = 1.62;

        this._skin = null;

        this._foodTickTimer = 0;

        this._totalXp = 0;
        this._xpSeed = 0;
        this._xpCooldown = 0;

        this._baseOffset = 1.62;
    }

    constructor(level, nbt){
        super();
        //CheckTypes([CompoundTag, nbt]); //TODO: check Level, but not implemented atm

        if (this._skin === null){
            let skinTag = nbt.getCompoundTag("Skin");
            if (skinTag === null){
                console.log("Human must have a valid skin set");
            }
            this._skin = self.deserializeSkinNBT(skinTag);
        }

        //this.constructor.call(level, nbt);
    }

    /**
     * @return {Skin}
     * @param skinTag {CompoundTag}
     */
    static deserializeSkinNBT(skinTag){
        //CheckTypes([CompoundTag, skinTag]);
        let skin = new Skin(
            skinTag.getString("Name"),
            skinTag.hasTag("Data", StringTag) ? skinTag.getString("Data") : skinTag.getByteArray("Data"),
            skinTag.getByteArray("CapeData", ""),
            skinTag.getString("GeometryName", ""),
            skinTag.getByteArray("GeometryData", "")
        );
        skin.validate();
        return skin;
    }

    /**
     * @deprecated
     * @param skin {string}
     * @returns {boolean}
     */
    static isValidSkin(skin){
        return Skin.getAcceptedSkinSizes().includes(skin.length);
    }

    /**
     *
     * @returns {UUID|null}
     */
    getUniqueId(){
        return this._uuid;
    }

    /**
     *
     * @returns {string}
     */
    getRawUniqueId(){
        return this._rawUUID;
    }

    /**
     * Returns a Skin object containing information about this human's skin.
     * @returns {Skin}
     */
    getSkin(){
        return this._skin;
    }

    /**
     * Sets the human's skin. This will not send any update to viewers, you need to do that manually using
     *
     * @param skin {Skin}
     */
    setSkin(skin){
        skin.validate();
        this._skin = skin;
        this._skin.debloatGeometryData();
    }

    /**
     * Sends the human's skin to the specified list of players. If null is given for targets, the skin will be sent to
     * all viewers.
     *
     * @param targets {Player[]|null}
     */
    sendSkin(targets = null){
        let pk = new PlayerSkinPacket();
        pk.uuid = this.getUniqueId();
        pk.skin = this._skin;
        //TODO: broadcast packet to online entities
    }

    jump(){
        //this.jump(); parent?

    }

}

module.exports = Human;