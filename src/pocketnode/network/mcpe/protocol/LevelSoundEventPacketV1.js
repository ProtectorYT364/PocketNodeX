const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

const Vector3 = require("../../../math/Vector3");

"use strict";

class LevelSoundEventPacketV1 extends DataPacket {
    static NETWORK_ID = ProtocolInfo.LEVEL_SOUND_EVENT_PACKET_V1;

    /** @type {number} */
    sound;
    /** @type {Vector3} */
    position = new Vector3();
    /** @type {number} */
    extraData;
    /** @type {string} */
    entityType = ":";
    /** @type {boolean} */
    isBabyMob = false;
    /** @type {boolean} */
    disableRelativeVolume = false;

    _decodePayload() {
        this.sound = this.readByte();
        this.position = this.readVector3();
        this.extraData = this.readVarInt();
        this.entityType = this.readVarInt();
        this.isBabyMob = this.readBool();
        this.disableRelativeVolume = this.readBool();
    }

    _encodePayload() {
        this.writeByte(this.sound);
        this.writeVector3(this.position);
        this.writeVarInt(this.extraData);
        this.writeVarInt(this.entityType);
        this.writeBool(this.isBabyMob);
        this.writeBool(this.disableRelativeVolume);
    }

    handle(session) {
        return session.handleLevelSoundEventPacketV1(this);
    }
}

module.exports = LevelSoundEventPacketV1;