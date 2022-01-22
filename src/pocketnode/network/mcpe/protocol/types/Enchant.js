class Enchant {

    id;
    level;

    constructor(id, level) {
        this.id = id;
        this.level = level;
    }

    getId() {
        return this.id;
    }

    getLevel() {
        return this.level;
    }


    static read(_in) {
        let id = _in.readByte();
        let level = _in.readByte();
        return new Enchant(id, level);
    }

    write(out) {
        out.writeByte(this.id);
        out.writeByte(this.level);
    }
}

module.exports = Enchant;