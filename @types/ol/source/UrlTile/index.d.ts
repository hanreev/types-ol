declare module 'ol/source/UrlTile' {

  import { AttributionLike } from 'ol/source/Source';
  import { ProjectionLike } from 'ol/proj';
  import State from 'ol/source/State';
  import TileGrid from 'ol/tilegrid/TileGrid';
  import { LoadFunction } from 'ol/Tile';
  import { UrlFunction } from 'ol/Tile';
  import TileSource from 'ol/source/Tile';
  import Event from 'ol/events/Event';
  import { EventsKey } from 'ol/events';
  import { TileSourceEvent } from 'ol/source/Tile';
  import { ObjectEvent } from 'ol/Object';

  export interface Options {
    attributions?: AttributionLike;
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    opaque?: boolean;
    projection?: ProjectionLike;
    state?: State;
    tileGrid?: TileGrid;
    tileLoadFunction: LoadFunction;
    tilePixelRatio?: number;
    tileUrlFunction?: UrlFunction;
    url?: string;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
    key?: string;
  }

  export default class UrlTile extends TileSource {
    constructor(options: Options);
    protected tileLoadFunction: LoadFunction;
    protected tileUrlFunction: UrlFunction;
    protected urls: string[];
    protected handleTileChange(event: Event): void;
    getTileLoadFunction(): LoadFunction;
    getTileUrlFunction(): UrlFunction;
    getUrls(): string[];
    setTileLoadFunction(tileLoadFunction: LoadFunction): void;
    setTileUrlFunction(tileUrlFunction: UrlFunction, key?: string): void;
    setUrl(url: string): void;
    setUrls(urls: string[]): void;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
  }

}
