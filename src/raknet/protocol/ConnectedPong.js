const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class ConnectedPong extends Packet {
    static ID = MessageIdentifiers.ID_CONNECTED_PONG;

    /** @type {number} */
    sendPingTime;
    /** @type {number} */
    sendPongTime;

    encodePayload() {
        this.writeLong(this.sendPingTime);
        this.writeLong(this.sendPongTime);
    }

    decodePayload() {
        this.sendPingTime = this.readLong();
        this.sendPongTime = this.readLong();
    }
}

module.exports = ConnectedPong;