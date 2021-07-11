import Tile from 'ol/Tile';
import TileState from 'ol/TileState';
import VectorTile from 'ol/VectorTile';
import Layer from 'ol/layer/Layer';
import { OrderFunction } from 'ol/render';
import Source from 'ol/source/Source';
import { TileCoord } from 'ol/tilecoord';

export interface ReplayState {
    dirty: boolean;
    renderedRenderOrder: null | OrderFunction;
    renderedTileRevision: number;
    renderedResolution: number;
    renderedRevision: number;
    renderedZ: number;
    renderedTileResolution: number;
    renderedTileZ: number;
}
export default class VectorRenderTile extends Tile {
    constructor(
        tileCoord: TileCoord,
        state: TileState,
        urlTileCoord: TileCoord,
        getSourceTiles: (p0: VectorRenderTile) => VectorTile[],
    );
    getContext(layer: Layer<Source>): CanvasRenderingContext2D;
    /**
     * Get the Canvas for this tile.
     */
    getImage(layer: Layer<Source>): HTMLCanvasElement;
    getReplayState(layer: Layer<Source>): ReplayState;
    hasContext(layer: Layer<Source>): boolean;
    /**
     * Load the tile.
     */
    load(): void;
    /**
     * Remove from the cache due to expiry
     */
    release(): void;
}
