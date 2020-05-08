const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class ConnectionRequestAccepted extends Packet {
    static ID = MessageIdentifiers.ID_CONNECTION_REQUEST_ACCEPTED;

    address;
    port;
    systemAddresses = [
        ["127.0.0.1", 0, 4]
    ];
    sendPingTime;
    sendPongTime;

    encodePayload() {
        this.writeAddress(this.address, this.port, 4);
        this.writeShort(0);

        for (let i = 0; i < 20; ++i) {
            let addr = typeof this.systemAddresses[i] !== "undefined" ? this.systemAddresses[i] : ["0.0.0.0", 0, 4];
            this.writeAddress(addr[0], addr[1], addr[2]);
        }

        this.writeLong(this.sendPingTime);
        this.writeLong(this.sendPongTime);
    }
}

module.exports = ConnectionRequestAccepted;