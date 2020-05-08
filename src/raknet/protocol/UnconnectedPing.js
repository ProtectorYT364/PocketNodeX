const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class UnconnectedPing extends OfflineMessage {
    static ID = MessageIdentifiers.ID_UNCONNECTED_PING;

    pingId;

    decodePayload() {
        this.pingId = this.readLong();
        this.readMagic();
    }
}

module.exports = UnconnectedPing;