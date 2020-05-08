const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class UnconnectedPing extends OfflineMessage {
    static ID = MessageIdentifiers.ID_UNCONNECTED_PING;

    /** @type {number} */
    pingID;

    encodePayload() {
        this.writeLong(this.pingID);
        this.writeMagic();
    }

    decodePayload() {
        this.pingID = this.readLong();
        this.readMagic();
    }
}

module.exports = UnconnectedPing;