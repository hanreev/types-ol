import { ObjectEvent } from 'ol/Object';
import Tile from 'ol/Tile';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ProjectionLike } from 'ol/proj';
import { Size } from 'ol/size';
import { TileSourceEvent } from 'ol/source/Tile';
import XYZ from 'ol/source/XYZ';
import { TileCoord } from 'ol/tilecoord';
import TileGrid from 'ol/tilegrid/TileGrid';

export interface Options {
    projection?: ProjectionLike;
    tileGrid?: TileGrid;
    wrapX?: boolean;
    zDirection?: number;
}
declare class LabeledTile extends Tile {
    constructor(tileCoord: TileCoord, tileSize: Size, text: string);
    /**
     * Get the image element for this tile.
     */
    getImage(): HTMLCanvasElement;
    /**
     * Load the image or retry if loading previously failed.
     * Loading is taken care of by the tile queue, and calling this method is
     * only needed for preloading or for reloading in case of an error.
     */
    load(): void;
}
export default class TileDebug extends XYZ {
    constructor(opt_options?: Options & { [key: string]: any });
    getTile(z: number, x: number, y: number): LabeledTile;
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
