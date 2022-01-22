const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class PacketViolationWarningPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.PACKET_VIOLATION_WARNING_PACKET;

    static get TYPE_MALFORMED() {
        return 0
    };

    static get SEVERITY_WARNING() {
        return 0
    };

    static get SEVERITY_FINAL_WARNING() {
        return 1
    };

    static get SEVERITY_TERMINATING_CONNECTION() {
        return 2
    };

    type;

    severity;

    packetId;

    message;

    static create(type, severity, packetId, message){
        let result = new PacketViolationWarningPacket();
        result.type = type;
        result.severity = severity;
        result.packetId = packetId;
        result.message = message;
        return result;
    }

    getType() { return this.type; }

    getSeverity() { return this.severity; }

    getPacketId() { return this.packetId; }

    getMessage() { return this.message; }

    _decodePayload() {
        this.type = this.readVarInt();
        this.severity = this.readVarInt();
        this.packetId = this.readVarInt();
        this.message = this.readString();
    }

    _encodePayload() {
        this.writeVarInt(this.type);
        this.writeVarInt(this.severity);
        this.writeVarInt(this.packetId);
        this.writeString(this.message);
    }

    handle(session) {
        return session.handlePacketViolationWarning(this);
    }
}

module.exports = PacketViolationWarningPacket;