const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class ConnectedPing extends Packet {
    static ID = MessageIdentifiers.ID_CONNECTED_PING;

    sendPingTime;

    encodePayload() {
        this.writeLong(this.sendPingTime);
    }

    decodePayload() {
        this.sendPingTime = this.readLong();
    }
}

module.exports = ConnectedPing;