const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class OpenConnectionRequest2 extends OfflineMessage {
    static ID = MessageIdentifiers.ID_OPEN_CONNECTION_REQUEST_2;

    serverAddress;
    serverPort;
    mtuSize;
    clientId;

    decodePayload() {
        this.readMagic();
        let addr = this.readAddress();
        this.serverAddress = addr.ip;
        this.serverPort = addr.port;
        this.mtuSize = this.readShort();
        this.clientId = this.readLong();
    }
}

module.exports = OpenConnectionRequest2;