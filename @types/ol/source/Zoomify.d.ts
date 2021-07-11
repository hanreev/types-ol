import ImageTile from 'ol/ImageTile';
import { ObjectEvent } from 'ol/Object';
import { LoadFunction } from 'ol/Tile';
import { Options as Options_1 } from 'ol/Tile';
import TileState from 'ol/TileState';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import { Size } from 'ol/size';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import TileImage from 'ol/source/TileImage';
import { TileCoord } from 'ol/tilecoord';

export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    projection?: ProjectionLike;
    tilePixelRatio?: number;
    reprojectionErrorThreshold?: number;
    url: string;
    tierSizeCalculation?: string;
    size: Size;
    extent?: Extent;
    transition?: number;
    tileSize?: number;
    zDirection?: number;
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
    constructor(opt_options: Options & { [key: string]: any });
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
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
