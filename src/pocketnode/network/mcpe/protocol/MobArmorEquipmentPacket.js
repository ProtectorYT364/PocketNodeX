const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class MobArmorEquipmentPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.MOB_ARMOR_EQUIPMENT_PACKET;

    /** @type {number} */
    entityRuntimeId;

    head = null;
    chest = null;
    legs = null;
    feet = null;

    _decodePayload() {
        this.entityRuntimeId = this.readEntityRuntimeId();
        this.head = this.readSlot();
        this.chest = this.readSlot();
        this.legs = this.readSlot();
        this.feet = this.readSlot();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeSlot(this.head);
        this.writeSlot(this.chest);
        this.writeSlot(this.legs);
        this.writeSlot(this.feet);
    }

    handle(handler) {
        return handler.handleMobArmorEquipment(this);
    }
}

module.exports = MobArmorEquipmentPacket;