const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class StructureBlockUpdatePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.STRUCTURE_BLOCK_UPDATE_PACKET;

    _decodePayload() {
        //TODO
    }

    _encodePayload() {
        //TODO
    }

    handle(handler) {
        return handler.handleStructureBlockUpdate(this);
    }
}

module.exports = StructureBlockUpdatePacket;