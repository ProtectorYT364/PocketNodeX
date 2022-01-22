const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class DisconnectPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.DISCONNECT_PACKET;

    allowBeforeLogin = true;

    /** @type {boolean} */
    hideDisconnectionScreen = false;
    /** @type {string} */
    message;

    _decodePayload() {
        this.hideDisconnectionScreen = this.readBool();
        if (!this.hideDisconnectionScreen) {
            this.message = this.readString();
        }
    }

    _encodePayload() {
        this.writeBool(this.hideDisconnectionScreen);
        if (!this.hideDisconnectionScreen) {
            this.writeString(this.message);
        }
    }

    handle(handler) {
        return handler.handleDisconnect(this);
    }
}

module.exports = DisconnectPacket;