const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

const fs = require('fs');
const ServerName = require("../../../../raknet/server/ServerName");
const Base64 = require("../../../utils/Base64");
const SpawnSettings = require("./types/SpawnSettings");

"use strict";

class StartGamePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.START_GAME_PACKET;

    spawnSettings = new SpawnSettings(0, "", 0);

    // int64 = varLong
    // int32 = varInt

    // vector 3 method
    // this.writeVarInt(0);
    // this.writeUnsignedVarInt(4);
    // this.writeVarInt(0);
    _encodePayload() {
        this.writeEntityUniqueId(1);
        this.writeEntityRuntimeId(1);
        this.writeVarInt(0); // game mode

        this.writeVector3(0, 4, 0); // player pos

        this.writeLFloat(0); // pitch
        this.writeLFloat(0); // yaw

        //Level settings
        this.writeVarInt(0); // seed
        this.spawnSettings.write(this);
        this.writeVarInt(2); // generator
        this.writeVarInt(0); // worldGamemode
        this.writeVarInt(1); // difficulty
        this.writeVector3(0, 4, 0); // world spawn vector 3
        this.writeBool(true); // achievement disabled
        this.writeVarInt(0); // day cycle / time
        this.writeVarInt(0); // edu edition offer
        this.writeBool(false); // edu features
        this.writeString(""); // eduProductUUID
        this.writeLFloat(0); // rain lvl
        this.writeLFloat(0); // lightning lvl
        this.writeBool(false); // confirmed platform locked
        this.writeBool(true); // multi player game
        this.writeBool(true); // broadcast to lan
        this.writeVarInt(0); // xbl broadcast mode
        this.writeVarInt(0); // platform broadcast mode
        this.writeBool(true); // commands enabled
        this.writeBool(false); // texture required
        // this.writeUnsignedVarInt(0); // game rules length
        this.writeGameRules([]);
        this.writeBool(0); // bonus chest
        this.writeBool(false); // start with map
        this.writeVarInt(1); // player perms
        this.writeLInt(0); // chunk tick range
        this.writeBool(false); // locked behavior
        this.writeBool(false); // locked texture
        this.writeBool(false); // from locked template
        this.writeBool(false); // msa gamer tags only
        this.writeBool(false); // from world template
        this.writeBool(false); // world template option locked
        this.writeBool(false); // only spawn v1 villagers
        this.writeString(ProtocolInfo.VERSION); // vanilla version
        this.writeLInt(0); // limitedWorldWidth
        this.writeLInt(0); // limitedWorldLength
        this.writeBool(false); // isNewNether
        this.writeBool(null); // experimentalGameplayOverride

        this.writeString(''); // random level uuid
        this.writeString("world"); // world name
        this.writeString(''); // template content identity
        this.writeBool(false); // is trial
        this.writeBool(false); // server auth movement
        this.writeLLong(0); // level time

        this.writeVarInt(0); // enchantment seed

        // TODO: block states
        // let blocks = fs.readFileSync(__dirname + '/../../../resources/blocks.nbt');
        // let buf = Buffer.from(blocks, 'base64');
        // this.append(buf);

        this.writeVarInt(0); // item length
        this.writeString('');
        this.writeBool(false); // enableNewInventorySystem
    }
}

module.exports = StartGamePacket;