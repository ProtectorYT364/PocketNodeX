const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class UnconnectedPong extends OfflineMessage {
    static ID = MessageIdentifiers.ID_UNCONNECTED_PONG;

    /** @type {number} */
    sendPingTime;
    /** @type {number} */
    serverId;
    /** @type {string} */
    serverName;

    encodePayload() {
        this.writeLong(this.pingId);
        this.writeLong(this.serverId);
        this.writeMagic();
        this.writeString(this.serverName);
    }
}

module.exports = UnconnectedPong;