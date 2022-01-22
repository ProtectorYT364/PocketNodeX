const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class DebugInfoPacket extends DataPacket{
    static NETWORK_ID = ProtocolInfo.DEBUG_INFO_PACKET;

    entityUniqueId;

    data;

    static create(entityUniqueId, data){
        let result = new DebugInfoPacket();
        result.entityUniqueId = entityUniqueId;
        result.data = data;
        return result;
    }

    getEntityUniqueIdField() { return this.entityUniqueId; }

    getData() { return this.data; }

    _decodePayload() {
        this.entityUniqueId = this.readEntityUniqueId();
        this.data = this.readString();
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.entityUniqueId);
        this.writeString(this.data);
    }

    handle(handler) {
        return handler.handleDebugInfo(this);
    }
}

module.exports = DebugInfoPacket;