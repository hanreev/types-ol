import { EventsKey } from '../events';
import Event from '../events/Event';
import { ObjectEvent } from '../Object';
import { ProjectionLike } from '../proj';
import { LoadFunction, UrlFunction } from '../Tile';
import TileGrid from '../tilegrid/TileGrid';
import { AttributionLike } from './Source';
import State from './State';
import TileSource, { TileSourceEvent } from './Tile';

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
    protected urls: string[];
    protected tileLoadFunction: LoadFunction;
    protected tileUrlFunction: UrlFunction;
    protected handleTileChange(event: Event): void;
    setTileLoadFunction(tileLoadFunction: LoadFunction): void;
    getTileUrlFunction(): UrlFunction;
    setUrl(url: string): void;
    setUrls(urls: string[]): void;
    getUrls(): string[];
    getTileLoadFunction(): LoadFunction;
    setTileUrlFunction(tileUrlFunction: UrlFunction, key?: string): void;
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
