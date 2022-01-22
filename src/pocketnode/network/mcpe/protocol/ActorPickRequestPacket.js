const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class ActorPickRequestPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.ACTOR_PICK_REQUEST_PACKET;

    /** @type {number} */
    entityUniqueId;
    /** @type {number} */
    hotbarSlot;

    _decodePayload() {
        this.entityUniqueId = this.readLLong();
        this.hotbarSlot = this.readByte();
    }

    _encodePayload() {
        this.writeLLong(this.entityUniqueId);
        this.writeByte(this.hotbarSlot);
    }

    handle(session) {
        return session.handleActorPickRequest(this);
    }
}

module.exports = ActorPickRequestPacket;
