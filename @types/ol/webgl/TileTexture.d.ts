import DataTile, { ArrayLike } from '../DataTile';
import ImageTile from '../ImageTile';
import Target from '../events/Target';
import ReprojTile from '../reproj/Tile';
import TileGrid from '../tilegrid/TileGrid';
import WebGLHelper from './Helper';

export interface Options {
    tile: TileType;
    grid: TileGrid;
    helper: WebGLHelper;
    gutter?: number | undefined;
}
export type TileType = DataTile | ImageTile | ReprojTile;
export default class TileTexture extends Target {
    constructor(options: Options);
    /**
     * Get data for a pixel.  If the tile is not loaded, null is returned.
     */
    getPixelData(renderCol: number, renderRow: number): ArrayLike | null;
    setTile(tile: TileType): void;
}
