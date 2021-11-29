import Tile from './Tile';
import { TileCoord } from './tilecoord';

/**
 * Data that can be used with a DataTile.
 */
export type Data = Uint8Array | Uint8ClampedArray | DataView;
export interface Options {
    tileCoord: TileCoord;
    loader: () => Promise<Data>;
    transition?: number;
}
export default class DataTile extends Tile {
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
     * Load not yet loaded URI.
     */
    load(): void;
}
