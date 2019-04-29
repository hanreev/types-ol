declare module 'ol/source/WMTS' {

  import { UrlFunction } from 'ol/Tile';
  import { AttributionLike } from 'ol/source/Source';
  import WMTSTileGrid from 'ol/tilegrid/WMTS';
  import { ProjectionLike } from 'ol/proj';
  import WMTSRequestEncoding from 'ol/source/WMTSRequestEncoding';
  import ImageTile from 'ol/ImageTile';
  import { LoadFunction } from 'ol/Tile';
  import TileImage from 'ol/source/TileImage';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';
  import { ObjectEvent } from 'ol/Object';
  import { TileSourceEvent } from 'ol/source/Tile';

  export function optionsFromCapabilities(wmtsCap: any, config: any): Options;

  export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: string;
    tileGrid: WMTSTileGrid;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    requestEncoding?: WMTSRequestEncoding | string;
    layer: string;
    style: string;
    tileClass?: ImageTile;
    tilePixelRatio?: number;
    format?: string;
    version?: string;
    matrixSet: string;
    dimensions?: any;
    url?: string;
    tileLoadFunction?: LoadFunction;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
  }

  export default class WMTS extends TileImage {
    constructor(options: Options);
    getDimensions(): any;
    getFormat(): string;
    getLayer(): string;
    getMatrixSet(): string;
    getRequestEncoding(): WMTSRequestEncoding;
    getStyle(): string;
    getVersion(): string;
    updateDimensions(dimensions: any): void;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): void;
  }

}
