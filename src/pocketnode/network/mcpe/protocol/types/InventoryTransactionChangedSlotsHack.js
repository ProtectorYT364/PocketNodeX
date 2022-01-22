const collect = require("collect.js");

class InventoryTransactionChangedSlotsHack {
    containerId;
    changedSlotIndexes;

    constructor(containerId, changedSlotIndexes) {
        this.containerId = containerId;
        this.changedSlotIndexes = changedSlotIndexes;
    }

    getContainerId() {
        return this.containerId;
    }

    getChangedSlotIndexes() {
        return this.changedSlotIndexes;
    }

    static read(_in) {
        let containerId = _in.readByte();
        let changedSlots = [];
        for (let i = 0, len = _in.readUnsignedVarInt(); i < len; ++i) {
            changedSlots.push(_in.readByte());
        }
        return new InventoryTransactionChangedSlotsHack(containerId, changedSlots);
    }

    write(out) {
        out.writeByte(this.containerId);
        let _count = collect(this.changedSlotIndexes);
        out.writeUnsignedVarInt(_count.count());
        this.changedSlotIndexes.forEach(index => {
            out.writeByte(index);
        });
    }
}

module.exports = InventoryTransactionChangedSlotsHack;