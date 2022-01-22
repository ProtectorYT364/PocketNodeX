const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class ActorFallPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.ACTOR_FALL_PACKET;

    /** @type {number} */
    entityRuntimeId;
    /** @type {number} */
    fallDistance;
    /** @type {boolean} */
    isInVoid = false;

    _decodePayload() {
        this.entityRuntimeId = this.readEntityRuntimeId();
        this.fallDistance = this.readLFloat();
        this.isInVoid = this.readBool();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeLFloat(this.fallDistance);
        this.writeBool(this.isInVoid);
    }

    handle(handler) {
        return handler.handleActorFall(this);
    }
}

module.exports = ActorFallPacket;