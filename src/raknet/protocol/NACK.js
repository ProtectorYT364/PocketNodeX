const AcknowledgementPacket = require("./AcknowledgementPacket");

class NACK extends AcknowledgementPacket {
    static ID = 0xA0;
}

module.exports = NACK;