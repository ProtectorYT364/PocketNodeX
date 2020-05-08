const Packet = require("./Packet");
const EncapsulatedPacket = require("./EncapsulatedPacket");
const BITFLAG = require("./BitFlags");

class Datagram extends Packet {

    headerFlags = 0;
    packetPair = false;
    continuousSend = false;
    needsBAndAs = false;
    packets = [];
    sequenceNumber = 0;

    encodeHeader() {
        if (this.packetPair === true) {
            this.headerFlags |= BITFLAG.PACKET_PAIR;
        }
        if (this.continuousSend === true) {
            this.headerFlags |= BITFLAG.CONTINUOUS_SEND;
        }
        if (this.needsBAndAs === true) {
            this.headerFlags |= BITFLAG.NEEDS_B_AND_AS;
        }
        this.writeByte(BITFLAG.VALID | this.headerFlags);
    }

    encodePayload() {
        this.writeLTriad(this.sequenceNumber); // all of a sudden sequence num started being a string
        this.packets.forEach(packet => this.append(packet));
    }

    getLength() {
        let length = 4;
        this.packets.forEach(packet => {
            length += (packet instanceof EncapsulatedPacket ? packet.getLength() : Buffer.byteLength(packet, "hex"));
        });
        return length;
    }

    decodeHeader() {
        this.headerFlags = this.readByte();
        this.packetPair = (this.headerFlags & BITFLAG.PACKET_PAIR) > 0;
        this.continuousSend = (this.headerFlags & BITFLAG.CONTINUOUS_SEND) > 0;
        this.needsBAndAs = (this.headerFlags & BITFLAG.NEEDS_B_AND_AS) > 0;
    }

    decodePayload() {
        this.sequenceNumber = this.readLTriad();

        while (!this.feof()) {
            this.packets.push(EncapsulatedPacket.fromBinary(this));
        }
    }
}

module.exports = Datagram;