import { ObjectEvent } from '../Object';
import { LoadFunction, UrlFunction } from '../Tile';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import { Size } from '../size';
import TileGrid from '../tilegrid/TileGrid';
import { AttributionLike } from './Source';
import { TileSourceEvent } from './Tile';
import TileImage from './TileImage';

export type TXYZBaseEventTypes = 'change' | 'error';
export type TXYZObjectEventTypes = 'propertychange';
export type TXYZTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Options {
    attributions?: AttributionLike;
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    opaque?: boolean;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    maxZoom?: number;
    minZoom?: number;
    maxResolution?: number;
    tileGrid?: TileGrid;
    tileLoadFunction?: LoadFunction;
    tilePixelRatio?: number;
    tileSize?: number | Size;
    tileUrlFunction?: UrlFunction;
    url?: string;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
    zDirection?: number | NearestDirectionFunction;
}
export default class XYZ extends TileImage {
    constructor(opt_options?: Options);
    on(type: TXYZBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TXYZBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TXYZBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TXYZBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TXYZBaseEventTypes | TXYZBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TXYZObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TXYZObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TXYZObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TXYZObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TXYZObjectEventTypes | TXYZObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TXYZTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TXYZTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TXYZTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TXYZTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(type: TXYZTileSourceEventTypes | TXYZTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): void;
}
