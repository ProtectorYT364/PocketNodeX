const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class ServerToClientHandshakePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.SERVER_TO_CLIENT_HANDSHAKE_PACKET;

    /** @type {string} */
    jwt;

    allowBeforeLogin = true;

    _decodePayload() {
        this.jwt = this.readString();
    }

    _encodePayload() {
        this.writeString(this.jwt);
    }

    handle(handler) {
        return handler.handleServerToClientHandshake(this);
    }
}

module.exports = ServerToClientHandshakePacket;