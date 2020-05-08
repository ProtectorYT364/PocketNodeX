const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class NewIncomingConnection extends Packet {
    static ID = MessageIdentifiers.ID_NEW_INCOMING_CONNECTION;

    address;
    port;
    systemAddresses = [];
    sendPingTime;
    sendPongTime;

    decodePayload() {
        let addr = this.readAddress();
        this.address = addr.ip;
        this.port = addr.port;

        let stopOffset = this.getBuffer().length - 16;
        for (let i = 0; i < 20; ++i) {
            if (this.offset >= stopOffset) {
                this.systemAddresses.push(["0.0.0.0", 0, 4]);
            } else {
                let addr = this.readAddress();
                this.systemAddresses.push([addr.ip, addr.port, addr.version]);
            }
        }

        this.sendPingTime = this.readLong();
        this.sendPongTime = this.readLong();
    }
}

module.exports = NewIncomingConnection;