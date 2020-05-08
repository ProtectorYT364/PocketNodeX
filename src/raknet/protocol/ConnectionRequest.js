const Packet = require("./Packet");
const MessageIdentifiers = require("./MessageIdentifiers");

class ConnectionRequest extends Packet {
    static ID = MessageIdentifiers.ID_CONNECTION_REQUEST;

    /** @type {number} */
    clientID;
    /** @type {number} */
    sendPingTime;
    /** @type {boolean} */
    useSecurity = false;

    encodePayload() {
        this.writeLong(this.clientID);
        this.writeLong(this.sendPingTime);
        this.writeBool(this.useSecurity);
    }

    decodePayload() {
        this.clientID = this.readLong();
        this.sendPingTime = this.readLong();
        this.useSecurity = this.readBool();
    }
}

module.exports = ConnectionRequest;