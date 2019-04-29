declare module 'ol/tileurlfunction' {

  import TileGrid from 'ol/tilegrid/TileGrid';
  import { UrlFunction } from 'ol/Tile';
  import { TileCoord } from 'ol/tilecoord';
  import Projection from 'ol/proj/Projection';

  export function createFromTemplate(template: string, tileGrid: TileGrid): UrlFunction;

  export function createFromTemplates(templates: string[], tileGrid: TileGrid): UrlFunction;

  export function createFromTileUrlFunctions(tileUrlFunctions: UrlFunction[]): UrlFunction;

  export function expandUrl(url: string): string[];

  export function nullTileUrlFunction(tileCoord: TileCoord, pixelRatio: number, projection: Projection): string;

}
