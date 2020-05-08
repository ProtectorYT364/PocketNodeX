const Packet = require("./Packet");
const RakNet = require("../RakNet");

class OfflineMessage extends Packet {
    magic;

    readMagic() {
        this.magic = this.getBuffer().slice(this.offset, this.increaseOffset(16, true));
    }

    writeMagic() {
        this.append(Buffer.from(RakNet.MAGIC, "binary"));
    }

    isValid() {
        return Buffer.from(this.magic).equals(Buffer.from(RakNet.MAGIC, "binary"));
    }
}

module.exports = OfflineMessage;