const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

"use strict";

class PlayerSkinPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.PLAYER_SKIN_PACKET;

    uuid;
    skin;
    newSkinName;
    oldSkinName;

    _decodePayload() {
        this.uuid = this.readUUID();
        this.skin = this.readSkin();
        this.newSkinName = this.readString();
        this.oldSkinName = this.readString();
        this.skin.setVerified(this.readBool());
    }

    _encodePayload() {
        this.writeUUID(this.uuid);
        this.writeSkin(this.skin);
        this.writeString(this.newSkinName);
        this.writeString(this.oldSkinName);
        this.writeBool(this.skin.isVerified());
    }

    handle(session) {
        return session.handlePlayerSkin(this);
    }
}

module.exports = PlayerSkinPacket;