const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");
const {count} = require("locutus/php/array");
const EnchantOption = require("./types/EnchantOption");

class PlayerEnchantOptionsPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.PLAYER_ENCHANT_OPTIONS_PACKET;

    options;

    static create(options) {
        let result = new PlayerEnchantOptionsPacket();
        result.options = options;
        return result;
    }

    getOptions() {
        return this.options;
    }

    decodePayload() {
        this.options = [];
        for (let i = 0, len = this.readUnsignedVarInt(); i < len; ++i) {
            this.options.push(EnchantOption.read(this));
        }
    }

    encodePayload() {
        this.writeUnsignedVarInt(count(this.options));
        this.options.forEach(option => {
            option.write(this);
        });
    }

    handle(handler) {
        return handler.handlePlayerEnchantOptions(this);
    }
}

module.exports = PlayerEnchantOptionsPacket;