const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

const Item = require("../../../item/Item");
const Vector3 = require("../../../math/Vector3");

class AddItemActorPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.ADD_ITEM_ACTOR_PACKET;

    /** @type {number|null} */
    entityUniqueId = null;
    /** @type {number} */
    entityRuntimeId;
    /** @type {Item} */
    item = null;
    /** @type {Vector3} */
    position = new Vector3();
    /** @type {Vector3|null} */
    motion = null;
    /** @type {any} */
    metadata = [];
    /** @type {boolean}*/
    isFromFishing = false;

    _decodePayload() {
        this.entityUniqueId = this.readEntityUniqueId();
        this.entityRuntimeId = this.readEntityRuntimeId();
        this.item = this.readSlot();
    }

    _encodePayload() {
        this.writeEntityUniqueId(this.entityUniqueId);
        this.writeEntityRuntimeId(this.entityRuntimeId);
        this.writeSlot(this.item);
    }
}

module.exports = AddItemActorPacket;