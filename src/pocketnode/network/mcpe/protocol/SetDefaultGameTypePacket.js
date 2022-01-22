const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class SetDefaultGameTypePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.SET_DEFAULT_GAME_TYPE_PACKET;

    /** @type {number} */
    gamemode = 0;

    _decodePayload() {
        this.gamemode = this.readVarInt();
    }

    _encodePayload() {
        this.writeUnsignedVarInt(this.gamemode);
    }

    handle(handler) {
        return handler.handleSetDefaultGameType(this);
    }
}

module.exports = SetDefaultGameTypePacket;