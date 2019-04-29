declare module 'ol/ImageTile' {

  import Tile from 'ol/Tile';
  import { TileCoord } from 'ol/tilecoord';
  import TileState from 'ol/TileState';
  import { LoadFunction } from 'ol/Tile';
  import { Options } from 'ol/Tile';

  export default class ImageTile extends Tile {
    constructor(tileCoord: TileCoord, state: TileState, src: string, crossOrigin: string, tileLoadFunction: LoadFunction, opt_options?: Options);
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
  }

}
