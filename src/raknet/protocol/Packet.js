const BinaryStream = require("../../binarystream/BinaryStream");

class Packet extends BinaryStream{
    static ID = 0x00;

    /** @type {number} */
    sendTime;

    getString() {
        return this.read(this.readShort()).toString();
    }

    readAddress() {
        let addr, port;
        let version = this.readByte();
        switch (version) {
            default:
            case 4:
                addr = [];
                for (let i = 0; i < 4; i++) {
                    addr.push(this.readByte() & 0xff);
                }
                addr = addr.join(".");
                port = this.readShort();
                break;
            // add ipv6 support
        }
        return {ip: addr, port: port, version: version};
    }

    writeString(v) {
        this.writeShort(Buffer.byteLength(v));
        this.append(Buffer.from(v, "utf8"));
    }

    writeAddress(addr, port, version = 4) {
        this.writeByte(version);
        switch (version) {
            default:
            case 4:
                addr.split(".", 4).forEach(b => this.writeByte((Number(b)) & 0xff));
                this.writeShort(port);
                break;
        }
    }

    getId() {
        return this.constructor.ID;
    }

    encode() {
        this.reset();
        this.encodeHeader();
        this.encodePayload();
    }

    encodeHeader() {
        this.writeByte(this.getId());
    }

    encodePayload() {}

    decode() {
        this.offset = 0;
        this.decodeHeader();
        this.decodePayload();
    }

    decodeHeader() {
        this.readByte();
    }

    decodePayload() {}

    getBuffer() {
        return this.buffer;
    }

    clean() {
        this.buffer = Buffer.alloc(0);
        this.offset = 0;
        this.sendTime = null;

        return this;
    }
}

module.exports = Packet;