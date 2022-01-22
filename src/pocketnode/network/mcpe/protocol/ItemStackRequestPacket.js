const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const collect = require("collect.js");
const ItemStackRequest = require("./types/Enchant");

class ItemStackRequestPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.ITEM_STACK_REQUEST_PACKET;

    requests;

    static create(requests){
        let result = new ItemStackRequestPacket();
        result.requests = requests;
        return requests;
    }

    getRequests(){ return this.requests; }

    _decodePayload() {
        this.requests = [];
        for(let i = 0, len = this.readUnsignedVarInt(); i < len; ++i){
            this.requests.push(ItemStackRequest.read(this));
        }
    }

    _encodePayload() {
        let _count = collect(this.requests);
        this.writeUnsignedVarInt(_count.count());
        this.requests.forEach(request => {
            request.write(this);
        });
    }

    handle(handler) {
        return handler.handleItemStackRequest(this);
    }
}

module.exports = ItemStackRequestPacket;