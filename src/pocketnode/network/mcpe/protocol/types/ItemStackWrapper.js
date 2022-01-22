class ItemStackWrapper {
    stackId;
    itemStack;

    constructor(stackId, itemStack) {
        this.stackId = stackId;
        this.itemStack = itemStack;
    }

    static legacy(itemStack) {
        return new ItemStackWrapper(itemStack.isNull() ? 0 : 1, itemStack);
    }

    getStackId() {
        return this.stackId;
    }

    getItemStack() {
        return this.itemStack;
    }

    static read(_in) {
        let stackId = _in.readGenericTypeNetworkId();
        let stack = _in.getSlot();
        return new ItemStackWrapper(stackId, stack);
    }

    write(out) {
        out.writeGenericTypeNetworkId(this.stackId);
        out.writeSlot(this.itemStack);
    }
}

module.exports = ItemStackWrapper;