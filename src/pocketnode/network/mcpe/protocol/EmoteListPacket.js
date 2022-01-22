const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const collect = require("collect.js");

class EmoteListPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.EMOTE_LIST_PACKET;

    playerEntityRuntimeId;

    emoteIds;

    static create(playerEntityRuntimeId, emoteIds) {
        let result = new EmoteListPacket();
        result.playerEntityRuntimeId = playerEntityRuntimeId;
        result.emoteIds = emoteIds;
        return result;
    }

    getEntityRuntimeId() { return this.playerEntityRuntimeId; }

    getEmoteIds() { return this.emoteIds; }

    _decodePayload() {
        this.playerEntityRuntimeId = this.readEntityRuntimeId();
        this.emoteIds = this.readString();
        this.emoteIds = [];
        for(let i = 0, len = this.readUnsignedVarInt(); i < len; ++i){
            this.emoteIds.push(this.readUUID());
        }
    }

    _encodePayload() {
        this.writeEntityRuntimeId(this.playerEntityRuntimeId);
        let _count = collect(this.emoteIds);
        this.writeUnsignedVarInt(_count.count());
        this.emoteIds.forEach(emoteId => {
            this.writeUUID(emoteId);
        });
    }

    handle(session) {
        return session.handleEmoteList(this);
    }
}

module.exports = EmoteListPacket;