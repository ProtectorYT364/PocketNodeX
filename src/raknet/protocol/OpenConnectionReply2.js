const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class OpenConnectionReply2 extends OfflineMessage {
    static ID = MessageIdentifiers.ID_OPEN_CONNECTION_REPLY_2;

    serverId;
    clientAddress;
    clientPort;
    mtuSize;
    serverSecurity = false;

    encodePayload() {
        this.writeMagic();
        this.writeLong(this.serverId);
        this.writeAddress(this.clientAddress, this.clientPort, 4)
        this.writeShort(this.mtuSize);
        this.writeBool(this.serverSecurity);
    }
}

module.exports = OpenConnectionReply2;