const AcknowledgementPacket = require("../protocol/AcknowledgementPacket");

class ACK extends AcknowledgementPacket {
    static ID = 0xc0;
}

module.exports = ACK;