const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class ConnectedPing extends Packet {
    static ID = MessageIdentifiers.ID_CONNECTED_PING;

    /** @type {number} */
    sendPingTime;

    encodePayload() {
        this.writeLong(this.sendPingTime);
    }

    decodePayload() {
        this.sendPingTime = this.readLong();
    }
}

module.exports = ConnectedPing;