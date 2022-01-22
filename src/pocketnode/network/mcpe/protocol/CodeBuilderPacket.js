const ProtocolInfo = require("./ProtocolInfo");
const DataPacket = require("./DataPacket");

class CodeBuilderPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.CODE_BUILDER_PACKET;

    url;

    openCodeBuilder;

    static create(url, openCodeBuilder){
        let result = new CodeBuilderPacket();
        result.url = url;
        result.openCodeBuilder = openCodeBuilder;
        return result;
    }

    getUrl(){
        return this.url;
    }

    getOpenCodeBuilder(){
        return this.openCodeBuilder;
    }

    _decodePayload() {
        this.url = this.readString();
        this.openCodeBuilder = this.readBool();
    }

    _encodePayload() {
        this.writeString(this.url);
        this.writeBool(this.openCodeBuilder);
    }

    handle(handler) {
        return handler.handleCodeBuilder(this);
    }
}

module.exports = CodeBuilderPacket;