const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const NBT = require('../../../nbt/NBT');

class PositionTrackingDBServerBroadcastPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.POSITION_TRACKING_D_B_SERVER_BROADCAST_PACKET;

    static get ACTION_UPDATE() {
        return 0
    };

    static get ACTION_DESTROY() {
        return 1
    };

    static get ACTION_NOT_FOUND() {
        return 2
    };

    action;
    trackingId;
    nbt;

    static create(action, trackingId, nbt) {
        let result = new PositionTrackingDBServerBroadcastPacket();
        result.action = action;
        result.trackingId = trackingId;
        result.nbt = nbt;
        return result;
    }

    getAction() { return this.action; }

    getTrackingId() { return this.trackingId; }

    getNbt() { return this.nbt; }

    _decodePayload() {
        this.action = this.readByte();
        this.trackingId = this.readVarInt();
        let nbt = new NBT();
        if(!(this.nbt instanceof nbt.tagTypes.compound)){
            throw new Error("Expected TAG_Compound");
        }
        this.nbt = nbt;
    }

    _encodePayload() {
        this.writeByte(this.action);
        this.writeVarInt(this.trackingId);
        this.append(this.nbt);
    }

    handle(handler) {
        return handler.handlePositionTrackingDBServerBroadcast(this);
    }
}

module.exports = PositionTrackingDBServerBroadcastPacket;