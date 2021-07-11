import { ObjectEvent } from '../Object';
import Tile from '../Tile';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import { Size } from '../size';
import { TileCoord } from '../tilecoord';
import TileGrid from '../tilegrid/TileGrid';
import { TileSourceEvent } from './Tile';
import XYZ from './XYZ';

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
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
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
