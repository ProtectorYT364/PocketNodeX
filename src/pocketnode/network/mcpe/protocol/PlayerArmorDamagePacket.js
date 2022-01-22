const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class PlayerArmorDamagePacket extends DataPacket {

    static NETWORK_ID = ProtocolInfo.PLAYER_ARMOR_DAMAGE_PACKET;

    static get FLAG_HEAD() {
        return 0
    };

    static get FLAG_CHEST() {
        return 1
    };

    static get FLAG_LEGS() {
        return 2
    };

    static get FLAG_FEET() {
        return 3
    };

    headSlotDamage;
    chestSlotDamage;
    legsSlotDamage;
    feetSlotDamage;

    static create(headSlotDamage, chestSlotDamage, legsSlotDamage, feetSlotDamage) {
        let result = new PlayerArmorDamagePacket();
        result.headSlotDamage = headSlotDamage;
        result.chestSlotDamage = chestSlotDamage;
        result.legsSlotDamage = legsSlotDamage;
        result.feetSlotDamage = feetSlotDamage;

        return result;
    }

    getHeadSlotDamage() {
        return this.headSlotDamage;
    }

    getChestSlotDamage() {
        return this.chestSlotDamage;
    }

    getLegsSlotDamage() {
        return this.legsSlotDamage;
    }

    getFeetSlotDamage() {
        return this.feetSlotDamage;
    }

    maybeReadDamage(flags, flag) {
        if ((flags & (1 << flag)) !== 0) {
            return this.writeVarInt();
        }
        return null;
    }

    decodePayload() {
        let flags = this.writeByte();

        this.headSlotDamage = this.maybeReadDamage(flags, PlayerArmorDamagePacket.FLAG_HEAD);
        this.chestSlotDamage = this.maybeReadDamage(flags, PlayerArmorDamagePacket.FLAG_CHEST);
        this.legsSlotDamage = this.maybeReadDamage(flags, PlayerArmorDamagePacket.FLAG_LEGS);
        this.feetSlotDamage = this.maybeReadDamage(flags, PlayerArmorDamagePacket.FLAG_FEET);
    }

    composeFlag(field, flag) {
        return field !== null ? (1 << flag) : null;
    }

    maybeWriteDamage(field) {
        if (field !== null) {
            this.writeVarInt(field);
        }
    }

    encodePayload() {
        this.writeByte(
            this.composeFlag(this.headSlotDamage, PlayerArmorDamagePacket.FLAG_HEAD) |
            this.composeFlag(this.chestSlotDamage, PlayerArmorDamagePacket.FLAG_CHEST) |
            this.composeFlag(this.legsSlotDamage, PlayerArmorDamagePacket.FLAG_LEGS) |
            this.composeFlag(this.feetSlotDamage, PlayerArmorDamagePacket.FLAG_FEET)
        );

        this.maybeWriteDamage(this.headSlotDamage);
        this.maybeWriteDamage(this.chestSlotDamage);
        this.maybeWriteDamage(this.legsSlotDamage);
        this.maybeWriteDamage(this.feetSlotDamage);
    }

    handle(handler) {
        return handler.handlePlayerArmorDamage(this);
    }
}

module.exports = PlayerArmorDamagePacket;