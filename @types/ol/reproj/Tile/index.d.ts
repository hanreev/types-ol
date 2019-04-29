declare module 'ol/reproj/Tile' {

  import Tile from 'ol/Tile';
  import Projection from 'ol/proj/Projection';
  import TileGrid from 'ol/tilegrid/TileGrid';
  import { TileCoord } from 'ol/tilecoord';

  export type FunctionType = (() => void);

  export default class ReprojTile extends Tile {
    constructor(sourceProj: Projection, sourceTileGrid: TileGrid, targetProj: Projection, targetTileGrid: TileGrid, tileCoord: TileCoord, wrappedTileCoord: TileCoord, pixelRatio: number, gutter: number, getTileFunction: FunctionType, opt_errorThreshold?: number, opt_renderEdges?: boolean);
    getImage(): HTMLCanvasElement;
  }

}
