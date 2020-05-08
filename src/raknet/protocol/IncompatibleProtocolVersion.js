const OfflineMessage = require("./OfflineMessage");
const MessageIdentifiers = require("./MessageIdentifiers");

class IncompatibleProtocolVersion extends OfflineMessage {
    static ID = MessageIdentifiers.ID_INCOMPATIBLE_PROTOCOL_VERSION;

    protocolVersion;
    serverId;

    encodePayload() {
        this.writeByte(this.protocolVersion);

        this.writeMagic();

        this.writeLong(this.serverId);
    }
}

module.exports = IncompatibleProtocolVersion;