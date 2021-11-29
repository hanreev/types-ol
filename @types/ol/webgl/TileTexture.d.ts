import DataTile from '../DataTile';
import ImageTile from '../ImageTile';
import Target from '../events/Target';
import TileGrid from '../tilegrid/TileGrid';
import WebGLHelper from './Helper';

export default class TileTexture extends Target {
    constructor(tile: DataTile | ImageTile, grid: TileGrid, helper: WebGLHelper);
    setTile(tile: DataTile | ImageTile): void;
}
