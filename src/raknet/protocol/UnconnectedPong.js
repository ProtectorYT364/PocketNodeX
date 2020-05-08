const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class UnconnectedPong extends OfflineMessage {
    static ID = MessageIdentifiers.ID_UNCONNECTED_PONG;

    /** @type {number} */
    pingID;
    /** @type {number} */
    serverID;
    /** @type {string} */
    serverName;

    encodePayload() {
        this.writeLong(this.pingID);
        this.writeLong(this.serverID);
        this.writeMagic();
        this.writeString(this.serverName);
    }

    decodePayload() {
        this.pingID = this.readLong();
        this.serverID = this.readLong();
        this.readMagic();
        this.serverName = this.readString();
    }
}

module.exports = UnconnectedPong;