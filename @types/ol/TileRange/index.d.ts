declare module 'ol/TileRange' {

  import { TileCoord } from 'ol/tilecoord';
  import { Size } from 'ol/size';

  export function createOrUpdate(minX: number, maxX: number, minY: number, maxY: number, tileRange?: TileRange): TileRange;

  export default class TileRange {
    constructor(minX: number, maxX: number, minY: number, maxY: number);
    contains(tileCoord: TileCoord): boolean;
    containsTileRange(tileRange: TileRange): boolean;
    containsXY(x: number, y: number): boolean;
    equals(tileRange: TileRange): boolean;
    extend(tileRange: TileRange): void;
    getHeight(): number;
    getSize(): Size;
    getWidth(): number;
    intersects(tileRange: TileRange): boolean;
  }

}
