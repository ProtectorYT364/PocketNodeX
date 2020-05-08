const BinaryStream = require("../../binarystream/BinaryStream");

"use strict";

class UUID {

    /** @type {number[]} */
    parts;
    /** @type {number} */
    version;

    constructor(part1 = 0, part2 = 0, part3 = 0, part4 = 0, version = null) {
        this.parts = [part1, part2, part3, part4];

        this.version = version || (this.parts[1] & 0xf000) >> 12;
    }

    getVersion() {
        return this.version;
    }

    equals(uuid) {
        return uuid.parts === this.parts;
    }

    static fromString(uuid, version = null) {
        return UUID.fromBinary(Buffer.from(uuid.trim().replace(/-/g, ""), "hex"), version);
    }

    static fromBinary(uuid, version) {
        if (uuid.length !== 16) {
            console.log(uuid);
            throw new TypeError("UUID buffer must be exactly 16 bytes");
        }
        let stream = new BinaryStream(Buffer.from(uuid));
        return new UUID(stream.readInt(), stream.readInt(), stream.readInt(), stream.readInt(), version);
    }

    /**
     * Returns a string random UUIDv3.
     * @return {string}
     */
    static stringFromRandom(){
        let dt = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    static fromRandom() {
        let strUUID = this.stringFromRandom();
        return UUID.fromString(strUUID, 3);
    }

    toBinary() {
        let stream = new BinaryStream();
        return stream.writeInt(this.parts[0] + this.parts[1] + this.parts[2] + this.parts[3]);
    }

    toString() {
        let hex = parseInt(this.toBinary(), 2).toString(16);
        return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
    }

    getPart(partNumber) {
        if (partNumber < 0 || partNumber > 3) {
            throw new Error(`Invalid UUID part index ${partNumber}`);
        }
        return this.parts[partNumber];
    }

    getParts() {
        return this.parts;
    }
}

module.exports = UUID;