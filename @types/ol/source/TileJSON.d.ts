import { ObjectEvent } from '../Object';
import { LoadFunction } from '../Tile';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Size } from '../size';
import { AttributionLike } from './Source';
import { TileSourceEvent } from './Tile';
import TileImage from './TileImage';

export type TTileJSONBaseEventTypes = 'change' | 'error';
export type TTileJSONObjectEventTypes = 'propertychange';
export type TTileJSONTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Config {
    name?: string;
    description?: string;
    version?: string;
    attribution?: string;
    template?: string;
    legend?: string;
    scheme?: string;
    tiles: string[];
    grids?: string[];
    minzoom?: number;
    maxzoom?: number;
    bounds?: number[];
    center?: number[];
}
export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    interpolate?: boolean;
    jsonp?: boolean;
    reprojectionErrorThreshold?: number;
    tileJSON?: Config;
    tileLoadFunction?: LoadFunction;
    tileSize?: number | Size;
    url?: string;
    wrapX?: boolean;
    transition?: number;
    zDirection?: number | NearestDirectionFunction;
}
export default class TileJSON extends TileImage {
    constructor(options: Options);
    protected handleTileJSONError(): void;
    protected handleTileJSONResponse(tileJSON: Config): void;
    getTileJSON(): Config;
    on(type: TTileJSONBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TTileJSONBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TTileJSONBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TTileJSONBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TTileJSONBaseEventTypes | TTileJSONBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TTileJSONObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TTileJSONObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TTileJSONObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TTileJSONObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TTileJSONObjectEventTypes | TTileJSONObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TTileJSONTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TTileJSONTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TTileJSONTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TTileJSONTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TTileJSONTileSourceEventTypes | TTileJSONTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
