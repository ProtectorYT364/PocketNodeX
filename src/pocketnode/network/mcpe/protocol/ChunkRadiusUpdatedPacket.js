const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class ChunkRadiusUpdatedPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.CHUNK_RADIUS_UPDATED_PACKET;

    /** @type {number} */
    radius;

    _decodePayload() {
        this.radius = this.readVarInt();
    }

    _encodePayload() {
        this.writeVarInt(this.radius);
    }
}

module.exports = ChunkRadiusUpdatedPacket;