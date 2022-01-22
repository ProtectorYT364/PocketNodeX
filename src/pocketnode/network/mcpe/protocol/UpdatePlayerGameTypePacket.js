const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

class UpdatePlayerGameTypePacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.UPDATE_PLAYER_GAME_TYPE_PACKET;

    gameMode;

    playerEntityUniqueId;

    static create(gameMode, playerEntityUniqueId){
        let result = new UpdatePlayerGameTypePacket();
        result.gameMode = gameMode;
        result.playerEntityUniqueId = playerEntityUniqueId;
        return result;
    }

    getGameMode(){ return this.gameMode; }

    getPlayerEntityUniqueId(){ return this.playerEntityUniqueId; }

    _decodePayload() {
        this.gameMode = this.readVarInt();
        this.playerEntityUniqueId = this.readEntityUniqueId();
    }

    _encodePayload() {
        this.writeVarInt(this.gameMode);
        this.writeEntityUniqueId(this.playerEntityUniqueId);
    }

    handle(handler) {
        return handler.handleUpdatePlayerGameType(this);
    }
}

module.exports = UpdatePlayerGameTypePacket;