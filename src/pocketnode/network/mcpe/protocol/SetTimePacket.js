const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class SetTimePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.SET_TIME_PACKET;

    /** @type {number} */
    time = 0;

    _decodePayload() {
        this.time = this.readVarInt();
    }

    _encodePayload() {
        this.writeVarInt(this.time);
    }

    handle(handler) {
        return handler.handleSetTime(this);
    }
}

module.exports = SetTimePacket;