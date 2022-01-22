const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const collect = require("collect.js");
const CreativeContentEntry = require("./types/CreativeContentEntry");

class CreativeContentPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.CREATIVE_CONTENT_PACKET;

    entries;

    static create(entries) {
        let result = new CreativeContentPacket();
        result.entries = entries;
        return result;
    }

    getEntries() { return this.entries; }

    _decodePayload() {
        this.entries = [];
        for(let i = 0, len = this.readUnsignedVarInt(); i < len; ++i){
            this.entries.push(CreativeContentEntry.read(this));
        }
    }

    _encodePayload() {
        let _count = collect(this.entries);
        this.writeUnsignedVarInt(_count.count());
        this.entries.forEach(entry => {
            entry.write(this);
        });
    }

    handle(session) {
        return session.handleCreativeContent(this);
    }
}

module.exports = CreativeContentPacket;