const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class PositionTrackingDBClientRequestPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.POSITION_TRACKING_D_B_CLIENT_REQUEST_PACKET;

    static get ACTION_QUERY() {
        return 0
    };

    action;
    trackingId;

    static create(action, trackingId){
        let result = new PositionTrackingDBClientRequestPacket();
        result.action = action;
        result.trackingId = trackingId;
    }

    _decodePayload() {
        this.action = this.readByte();
        this.trackingId = this.readVarInt();
    }

    _encodePayload() {
        this.writeByte(this.action);
        this.writeVarInt(this.trackingId);
    }

    handle(session) {
        return session.handlePositionTrackingDBClientRequest(this);
    }
}

module.exports = PositionTrackingDBClientRequestPacket;