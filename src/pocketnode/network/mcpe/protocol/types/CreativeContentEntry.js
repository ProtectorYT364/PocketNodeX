class CreativeContentEntry {

    entryId;
    item;

    constructor(entryId, item) {
        this.entryId = entryId;
        this.item = item;
    }

    getEntryId() {
        return this.entryId;
    }

    getItem() {
        return this.item;
    }

    static read(_in) {
        let entryId = _in.readGenericTypeNetworkId();
        let item = _in.getSlot();
        return new CreativeContentEntry(entryId, item);
    }

    write(out) {
        out.writeGenericTypeNetworkId(this.entryId);
        out.writeSlot(this.item);
    }
}

module.exports = CreativeContentEntry;