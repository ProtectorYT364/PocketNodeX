const SkinImage = require('./SkinImage');
const SkinAnimation = require('./SkinAnimation');

class SkinData {

    static ARM_SIZE_SLIM = "slim";
    static ARM_SIZE_WIDE = "wide";

    /** @type {string} */
    _skinId;
    /** @type {string} */
    _resourcePatch;
    /** @type {SkinImage} */
    _skinImage;
    /** @type {SkinAnimation[]} */
    _animations;
    /** @type {SkinImage} */
    _capeImage;
    /** @type {string} */
    _geometryData;
    /** @type {string} */
    _animationData;
    /** @type {boolean} */
    _persona;
    /** @type {boolean} */
    _premium;
    /** @type {boolean} */
    _personaCapeOnClassic;
    /** @type {string} */
    _capeId;
    /** @type {string} */
    _armSize;
    /** @type {string} */
    _skinColor;
    /** @type {PersonaSkinPiece[]} */
    _personaPieces;
    /** @type {PersonaPieceTintColor[]} */
    _pieceTintColors;
    /** @type {boolean} */
    _isVerified;

    /**
     * @param skinId {string}
     * @param resourcePatch {string}
     * @param skinImage {SkinImage}
     * @param animations {SkinAnimation[]}
     * @param capeImage {SkinImage}
     * @param geometryData {string}
     * @param animationData {string}
     * @param premium {boolean}
     * @param persona {boolean}
     * @param personaCapeOnClassic {boolean}
     * @param capeId {string}
     * @param armSize
     * @param skinColor
     * @param personaPieces
     * @param pieceTintColors
     * @param isVerified
     */
    constructor(skinId, resourcePatch, skinImage, animations = [], capeImage = null, geometryData = '', animationData = '', premium = false, persona = false, personaCapeOnClassic = false, capeId = '', armSize = SkinData.ARM_SIZE_WIDE, skinColor = "", personaPieces = [], pieceTintColors = [], isVerified = false) {
        this._skinId = skinId;
        this._resourcePatch = resourcePatch;
        this._skinImage = skinImage;
        this._animations = animations;
        this._capeImage = capeImage;
        this._geometryData = geometryData;
        this._animationData = animationData;
        this._premium = premium;
        this._persona = persona;
        this._personaCapeOnClassic = personaCapeOnClassic;
        this._capeId = capeId;
        this._armSize = armSize;
        this._skinColor = skinColor;
        this._personaPieces = personaPieces;
        this._pieceTintColors = pieceTintColors;
        this._isVerified = isVerified;
    }

    /** @type {string} */
    getSkinId() {
        return this._skinId;
    }

    /** @type {string} */
    getResourcePatch() {
        return this._resourcePatch;
    }

    /** @type {SkinImage} */
    getSkinImage() {
        return this._skinImage;
    }

    /** @type {SkinAnimation[]} */
    getAnimations() {
        return this._animations;
    }

    /** @type {SkinImage} */
    getCapeImage() {
        return this._capeImage;
    }

    /** @type {string} */
    getGeometryData() {
        return this._geometryData;
    }

    /** @type {string} */
    getAnimationData() {
        return this._animationData;
    }

    /** @type {boolean} */
    isPersona() {
        return this._persona;
    }

    /** @type {boolean} */
    isPremium() {
        return this._premium;
    }

    /** @type {boolean} */
    isPersonaCapeOnClassic() {
        return this._personaCapeOnClassic;
    }

    /** @type {string} */
    getCapeId() {
        return this._capeId;
    }

    getArmSize() {
        return this._armSize;
    }

    getSkinColor() {
        return this._skinColor;
    }

    /**
     * @returns {PersonaSkinPiece[]}
     */
    getPersonaPieces() {
        return this._personaPieces;
    }

    /**
     * @returns {PersonaPieceTintColor[]}
     */
    getPieceTintColors() {
        return this._pieceTintColors;
    }

    isVerified() {
        return this._isVerified;
    }

    setVerified(verified) {
        this._isVerified = verified;
    }
}

module.exports = SkinData;