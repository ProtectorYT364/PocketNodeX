const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class OpenConnectionRequest1 extends OfflineMessage {
    static ID = MessageIdentifiers.ID_OPEN_CONNECTION_REQUEST_1;

    protocolVersion;
    mtuSize;

    decodePayload() {
        this.readMagic();
        this.protocolVersion = this.readByte();
        this.mtuSize = this.getBuffer().slice(this.offset).length + 18;
    }
}

module.exports = OpenConnectionRequest1;