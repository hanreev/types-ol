import Tile from './Tile';
import { Size } from './size';
import { TileCoord } from './tilecoord';

export type ArrayLike = Uint8Array | Uint8ClampedArray | Float32Array | DataView;
/**
 * Data that can be used with a DataTile.
 */
export type Data = ArrayLike | ImageLike;
export type ImageLike = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
export interface Options {
    tileCoord: TileCoord;
    loader: () => Promise<Data>;
    transition?: number | undefined;
    interpolate?: boolean | undefined;
    size?: Size | undefined;
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
     * Get the tile size.
     */
    getSize(): Size;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
}
export function asArrayLike(data: Data): ArrayLike | null;
export function asImageLike(data: Data): ImageLike | null;
export function toArray(image: ImageLike): Uint8ClampedArray;
