import DataTile, { Data } from '../DataTile';
import Projection from '../proj/Projection';
import { Size } from '../size';
import { TileCoord } from '../tilecoord';
import TileGrid from '../tilegrid/TileGrid';

export interface Options {
    sourceProj: Projection;
    sourceTileGrid: TileGrid;
    targetProj: Projection;
    targetTileGrid: TileGrid;
    tileCoord: TileCoord;
    wrappedTileCoord?: TileCoord | undefined;
    pixelRatio: number;
    gutter: number;
    getTileFunction: TileGetter;
    interpolate?: boolean | undefined;
    errorThreshold?: number | undefined;
    transition?: number | undefined;
}
export type TileGetter = (p0: number, p1: number, p2: number, p3: number) => DataTile;
export default class ReprojDataTile extends DataTile {
    constructor(options: Options);
    /**
     * Get the data for the tile.
     */
    getData(): Data;
    /**
     * Get any loading error.
     */
    getError(): Error;
    /**
     * Get the tile size.
     */
    getSize(): Size;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
}
