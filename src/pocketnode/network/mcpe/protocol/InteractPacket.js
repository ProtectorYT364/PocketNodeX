const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class InteractPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.INTERACT_PACKET;

    /** @type {number} */
    action;
    /** @type {number} */
    target;

    /** @type {number} */
    x = 0.0;
    /** @type {number} */
    y = 0.0;
    /** @type {number} */
    z = 0.0;

    static get ACTION_LEAVE_VEHICLE() {
        return 3
    };

    static get ACTION_MOUSEOVER() {
        return 4
    };

    static get ACTION_OPEN_INVENTORY() {
        return 6
    };

    _decodePayload() {
        this.action = this.readByte();
        this.target = this.readEntityRuntimeId();

        if (this.action === InteractPacket.ACTION_MOUSEOVER) {
            //TODO: should this be a vector3?
            this.x = this.readLFloat();
            this.y = this.readLFloat();
            this.z = this.readLFloat();
        }
    }

    _encodePayload() {
        this.writeByte(this.action);
        this.writeEntityRuntimeId(this.target);

        if (this.action === InteractPacket.ACTION_MOUSEOVER) {
            this.writeLFloat(this.x);
            this.writeLFloat(this.y);
            this.writeLFloat(this.z);
        }
    }

    handle(handler) {
        return handler.handleInteract(this);
    }
}

module.exports = InteractPacket;