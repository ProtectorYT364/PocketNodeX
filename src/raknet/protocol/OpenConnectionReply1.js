const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class OpenConnectionReply1 extends OfflineMessage {
    static ID = MessageIdentifiers.ID_OPEN_CONNECTION_REPLY_1;

    serverId;
    serverSecurity = false;
    mtuSize;

    encodePayload() {
        this.writeMagic();
        this.writeLong(this.serverId);
        this.writeBool(this.serverSecurity);
        this.writeShort(this.mtuSize);
    }
}

module.exports = OpenConnectionReply1;