const DataPacket = require("./DataPacket");
const ProtocolInfo = require("./ProtocolInfo");

const NetworkInventoryAction = require("./types/NetworkInventoryAction");
const collect = require("collect.js");
const InventoryTransactionChangedSlotsHack = require("./types/InventoryTransactionChangedSlotsHack");

"use strict";

class InventoryTransactionPacket extends DataPacket {
    static NETWORK_ID = ProtocolInfo.INVENTORY_TRANSACTION_PACKET;

    static get TYPE_NORMAL() {
        return 0
    };

    static get TYPE_MISMATCH() {
        return 1
    };

    static get TYPE_USE_ITEM() {
        return 2
    };

    static get TYPE_USE_ITEM_ON_ENTITY() {
        return 3
    };

    static get TYPE_RELEASE_ITEM() {
        return 4
    };

    static get USE_ITEM_ACTION_CLICK_BLOCK() {
        return 0
    };

    static get USE_ITEM_ACTION_CLICK_AIR() {
        return 1
    };

    static get USE_ITEM_ACTION_BREAK_BLOCK() {
        return 2
    };

    static get RELEASE_ITEM_ACTION_RELEASE() {
        return 0
    }; //bow shoot
    static get RELEASE_ITEM_ACTION_CONSUME() {
        return 1
    }; //eat food, drink potion

    static get USE_ITEM_ON_ENTITY_ACTION_INTERACT() {
        return 0
    };

    static get USE_ITEM_ON_ENTITY_ACTION_ATTACK() {
        return 1
    };

    requestId;

    requestChangedSlot;

    /** @type {number} */
    transactionType;

    hasItemStackIds;

    /** @type {boolean} */
    isCraftingPart = false;
    /** @type {boolean} */
    isFinalCraftingPart = false;
    /** @type {any} */
    actions = [];
    /** @type {any} */
    trData = null;

    _decodePayload() {
        this.requestId = this.readGenericTypeNetworkId();
        this.requestChangedSlots = [];
        if(this.requestId !== 0){
            for(let i = 0, len = this.readUnsignedVarInt(); i < len; ++i){
                this.requestChangedSlots.push(InventoryTransactionChangedSlotsHack.read(this));
            }
        }
        this.transactionType = this.readUnsignedVarInt();

        this.hasItemStackIds = this.readBool();

        for (let i = 0, count = this.readUnsignedVarInt(); i < count; ++i) {
            this.actions.push(new NetworkInventoryAction().read(this, this.hasItemStackIds));
        }

        //TODO
        this.trData = clone(new InventoryTransactionPacket());

        switch (this.transactionType) {
            case InventoryTransactionPacket.TYPE_NORMAL:
            case InventoryTransactionPacket.TYPE_MISMATCH:
                break;
            case InventoryTransactionPacket.TYPE_USE_ITEM:
                this.trData.actionType = this.readUnsignedVarInt();
                this.readBlockPosition(this.trData.x, this.trData.y, this.trData.z);
                this.trData.face = this.readVarInt();
                this.trData.hotbarSlot = this.readVarInt();
                this.trData.itemInHand = this.readSlot();
                this.trData.playerPos = this.readVector3();
                this.trData.clickPos = this.readVector3();
                this.trData.blockRuntimeId = this.readUnsignedVarInt();
                break;
        }
    }

    _encodePayload() {
        this.writeGenericTypeNetworkId(this.requestId);
        if(this.requestId !== 0){
            let _count = collect(this.requestChangedSlot);
            this.writeUnsignedVarInt(_count.count());
            this.requestChangedSlot.forEach(changedSlots => {
                changedSlots.write(this);
            });
        }

        this.writeUnsignedVarInt(this.transactionType);

	this.writeBool(this.hasItemStackIds);

        this.writeUnsignedVarInt(this.actions.length);
        this.actions.forEach(action => {
            action.write(this, this.hasItemStackIds);
        });

        switch (this.transactionType) {
            case InventoryTransactionPacket.TYPE_NORMAL:
            case InventoryTransactionPacket.TYPE_MISMATCH:
                break;
            case InventoryTransactionPacket.TYPE_USE_ITEM:
                this.writeUnsignedVarInt(this.trData.actionType);
                this.writeBlockPosition(this.trData.x, this.trData.y, this.trData.z);
                this.writeVarInt(this.trData.face);
                this.writeVarInt(this.trData.hotbarSlot);
                this.writeSlot(this.trData.itemInHand);
                this.writeVector3(this.trData.playerPos);
                this.writeVector3(this.trData.clickPos);
                this.writeUnsignedVarInt(this.trData.blockRuntimeId);
                break;
        }
    }

    handle(handler) {
        return handler.handleInventoryTransaction(this);
    }
}

module.exports = InventoryTransactionPacket;
