class SpawnSettings {

    static get BIOME_TYPE_DEFAULT() {
        return 0
    };

    static get BIOME_TYPE_USER_DEFINED() {
        return 1
    };

    biomeType;
    biomeName;
    dimension;

    constructor(biomeType, biomeName, dimension) {
        this.biomeType = biomeType;
        this.biomeName = biomeName;
        this.dimension = dimension;
    }

    getBiomeType() {
        return this.biomeType;
    }

    getBiomeName() {
        return this.biomeName;
    }

    /**
     * @see DimensionIds
     */
    getDimension() {
        return this.dimension;
    }

    /**
     * @param _in {NetworkBinaryStream}
     */
    static read(_in) {
        let biomeType = _in.readLShort();
        let biomeName = _in.readString();
        let dimension = _in.readVarInt();

        return new SpawnSettings(biomeType, biomeName, dimension);
    }

    /**
     * @param out {NetworkBinaryStream}
     */
    write(out) {
        out.writeLShort(this.biomeType);
        out.writeString(this.biomeName);
        out.writeVarInt(this.dimension);
    }
}

module.exports = SpawnSettings;