import ImageTile from '../ImageTile';
import { ObjectEvent } from '../Object';
import { LoadFunction, Options as Options_1 } from '../Tile';
import TileState from '../TileState';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { ProjectionLike } from '../proj';
import { Size } from '../size';
import { TileCoord } from '../tilecoord';
import { AttributionLike } from './Source';
import { TileSourceEvent } from './Tile';
import TileImage from './TileImage';

export type TZoomifyBaseEventTypes = 'change' | 'error';
export type TZoomifyObjectEventTypes = 'propertychange';
export type TZoomifyTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    interpolate?: boolean;
    projection?: ProjectionLike;
    tilePixelRatio?: number;
    reprojectionErrorThreshold?: number;
    url: string;
    tierSizeCalculation?: string;
    size: Size;
    extent?: Extent;
    transition?: number;
    tileSize?: number;
    zDirection?: number | NearestDirectionFunction;
}
export class CustomTile extends ImageTile {
    constructor(
        tileSize: Size,
        tileCoord: TileCoord,
        state: TileState,
        src: string,
        crossOrigin: string,
        tileLoadFunction: LoadFunction,
        opt_options?: Options_1,
    );
    /**
     * Get the image element for this tile.
     */
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
}
export default class Zoomify extends TileImage {
    constructor(opt_options: Options);
    on(type: TZoomifyBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TZoomifyBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TZoomifyBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TZoomifyBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TZoomifyBaseEventTypes | TZoomifyBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TZoomifyObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TZoomifyObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TZoomifyObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TZoomifyObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TZoomifyObjectEventTypes | TZoomifyObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TZoomifyTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TZoomifyTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TZoomifyTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TZoomifyTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TZoomifyTileSourceEventTypes | TZoomifyTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
