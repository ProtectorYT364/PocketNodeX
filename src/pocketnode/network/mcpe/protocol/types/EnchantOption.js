const {count} = require("locutus/php/array");

class EnchantOption {
    cost;

    slotFlags;
    equipActivatedEnchantments;
    heldActivatedEnchantments;
    selfActivatedEnchantments;
    name;
    optionId;

    constructor(cost, slotFlags, equipActivatedEnchantments, heldActivatedEnchantments, selfActivatedEnchantments, name, optionId) {
        this.cost = cost;
        this.slotFlags = slotFlags;
        this.equipActivatedEnchantments = equipActivatedEnchantments;
        this.heldActivatedEnchantments = heldActivatedEnchantments;
        this.selfActivatedEnchantments = selfActivatedEnchantments;
        this.name = name;
        this.optionId = optionId;
    }

    getCost() {
        return this.cost;
    }

    getSlotFlags() {
        return this.slotFlags;
    }

    getEquipActivatedEnchantments() {
        return this.equipActivatedEnchantments;
    }

    getHeldActivatedEnchantments() {
        return this.heldActivatedEnchantments;
    }

    getSelfActivatedEnchantments() {
        return this.selfActivatedEnchantments;
    }

    getName() {
        return this.name;
    }

    getOptionId() {
        return this.optionId;
    }

    /**
     * @param _in {NetworkBinaryStream}
     */
    static readEnchantList(_in) {
        let result = [];
        for (let i = 0, len = _in.readUnsignedVarInt(); i < len; ++i) {
            result.push(_in);
        }
        return result;
    }

    /**
     * @param _out {NetworkBinaryStream}
     * @param list {Enchant[]}
     */
    static writeEnchantList(_out, list) {
        _out.writeUnsignedVarInt(count(list));
        list.forEach(item => {
            item.write(_out);
        });
    }

    /**
     * @param _in {NetworkBinaryStream}
     */
    static read(_in) {
        let cost = _in.readUnsignedVarInt();

        let slotFlags = _in.readLInt();
        let equipActivatedEnchants = EnchantOption.readEnchantList(_in);
        let heldActivatedEnchants = EnchantOption.readEnchantList(_in);
        let selfActivatedEnchants = EnchantOption.readEnchantList(_in);

        let name = _in.readString();
        let optionId = _in.readGenericTypeNetworkId();

        return new EnchantOption(cost, slotFlags, equipActivatedEnchants, heldActivatedEnchants, selfActivatedEnchants, name, optionId);
    }

    write(_out) {
        _out.writeUnsignedVarInt(this.cost);

        _out.writeLInt(this.slotFlags);
        EnchantOption.writeEnchantList(_out, this.equipActivatedEnchantments);
        EnchantOption.writeEnchantList(_out, this.heldActivatedEnchantments);
        EnchantOption.writeEnchantList(_out, this.selfActivatedEnchantments);

        _out.writeString(this.name);
        _out.writeGenericTypeNetworkId(this.optionId);
    }
}

module.exports = EnchantOption;