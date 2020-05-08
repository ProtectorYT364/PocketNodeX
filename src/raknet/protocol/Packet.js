const BinaryStream = require("../../binarystream/BinaryStream");

class Packet extends BinaryStream{
    static ID = 0x00;

    getId() {
        return this.constructor.ID;
    }

    encode() {
        this.encodeHeader();
        this.encodePayload();
    }

    encodeHeader() {
        this.writeByte(this.getId());
    }

    encodePayload() {
    }

    decode() {
        this.decodeHeader();
        this.decodePayload();
    }

    decodeHeader() {
        this.readByte();
    }

    decodePayload() {
    }

    /** @param v {string} */
    writeString(v) {
        this.writeShort(v.length);
        this.append(Buffer.from(v, "utf8"));
    }

    getStream() {
        return this;
    }

    getBuffer() {
        return this.buffer;
    }
}

module.exports = Packet;