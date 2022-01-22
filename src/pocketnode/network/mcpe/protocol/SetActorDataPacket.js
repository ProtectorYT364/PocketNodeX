const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class SetActorDataPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.SET_ACTOR_DATA_PACKET;

    /** @type {number} */
    entityRuntimeId;
    /** @type {any} */
    metadata = null;

    _decodePayload() {
        this.entityRuntimeId = this.readEntityRuntimeId();
        this.metadata = this.readEntityMetadata();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeEntityMetadata(this.metadata);
    }

    handle(session) {
        return session.handleSetEntityData(this);
    }
}

module.exports = SetActorDataPacket;