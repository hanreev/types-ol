import { ObjectEvent } from '../Object';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { Versions } from '../format/IIIFInfo';
import { ProjectionLike } from '../proj';
import { Size } from '../size';
import { AttributionLike } from './Source';
import State from './State';
import { TileSourceEvent } from './Tile';
import TileImage from './TileImage';

export type TIIIFBaseEventTypes = 'change' | 'error';
export type TIIIFObjectEventTypes = 'propertychange';
export type TIIIFTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Options {
    attributions?: AttributionLike;
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    crossOrigin?: null | string;
    extent?: Extent;
    format?: string;
    imageSmoothing?: boolean;
    interpolate?: boolean;
    projection?: ProjectionLike;
    quality?: string;
    reprojectionErrorThreshold?: number;
    resolutions?: number[];
    size: Size;
    sizes?: Size[];
    state?: State;
    supports?: string[];
    tilePixelRatio?: number;
    tileSize?: number | Size;
    transition?: number;
    url?: string;
    version?: Versions;
    zDirection?: number | NearestDirectionFunction;
}
export default class IIIF extends TileImage {
    constructor(opt_options?: Options);
    on(type: TIIIFBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TIIIFBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TIIIFBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TIIIFBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TIIIFBaseEventTypes | TIIIFBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TIIIFObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TIIIFObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TIIIFObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TIIIFObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TIIIFObjectEventTypes | TIIIFObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TIIIFTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TIIIFTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TIIIFTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TIIIFTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TIIIFTileSourceEventTypes | TIIIFTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
