const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const collect = require("collect.js");

class ItemStackResponsePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.ITEM_STACK_RESPONSE_PACKET;

    responses;

    static create(responses){
        let result = new ItemStackResponsePacket();
        result.responses = responses;
        return responses;
    }

    getResponses() { return this.responses; }

    _decodePayload() {
        this.responses = [];
        for(let i = 0, len = this.readUnsignedVarInt(); i < len; ++i){
            this.responses.push(ItemStackResponse.read(this));
        }
    }

    _encodePayload() {
        let _count = collect(this.responses);
        this.writeUnsignedVarInt(_count.count());
        this.responses.forEach(response => {
            response.write(this);
        });
    }

    handle(session) {
        return session.handleItemStackResponse(this);
    }
}

module.exports = ItemStackResponsePacket;