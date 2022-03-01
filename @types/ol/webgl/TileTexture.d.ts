import DataTile, { Data } from '../DataTile';
import ImageTile from '../ImageTile';
import Target from '../events/Target';
import ReprojTile from '../reproj/Tile';
import TileGrid from '../tilegrid/TileGrid';
import WebGLHelper from './Helper';

export interface Options {
    tile: TileType;
    grid: TileGrid;
    helper: WebGLHelper;
    tilePixelRatio?: number | undefined;
    gutter?: number | undefined;
}
export type TileType = DataTile | ImageTile | ReprojTile;
export default class TileTexture extends Target {
    constructor(options: Options);
    /**
     * Get data for a pixel.  If the tile is not loaded, null is returned.
     */
    getPixelData(col: number, row: number): Data | null;
    setTile(tile: TileType): void;
}
