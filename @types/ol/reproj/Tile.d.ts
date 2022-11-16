import Tile from '../Tile';
import Projection from '../proj/Projection';
import { TileCoord } from '../tilecoord';
import TileGrid from '../tilegrid/TileGrid';

export type FunctionType = (p0: number, p1: number, p2: number, p3: number) => Tile;
export default class ReprojTile extends Tile {
    constructor(
        sourceProj: Projection,
        sourceTileGrid: TileGrid,
        targetProj: Projection,
        targetTileGrid: TileGrid,
        tileCoord: TileCoord,
        wrappedTileCoord: TileCoord,
        pixelRatio: number,
        gutter: number,
        getTileFunction: FunctionType,
        errorThreshold?: number,
        renderEdges?: boolean,
        interpolate?: boolean,
    );
    /**
     * Get the HTML Canvas element for this tile.
     */
    getImage(): HTMLCanvasElement;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
    /**
     * Remove from the cache due to expiry
     */
    release(): void;
}
