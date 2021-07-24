import ImageTile from '../ImageTile';
import { ObjectEvent } from '../Object';
import Tile, { LoadFunction, UrlFunction } from '../Tile';
import TileCache from '../TileCache';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import TileGrid from '../tilegrid/TileGrid';
import { AttributionLike } from './Source';
import State from './State';
import { TileSourceEvent } from './Tile';
import UrlTile from './UrlTile';

export type TTileImageBaseEventTypes = 'change' | 'error';
export type TTileImageObjectEventTypes = 'propertychange';
export type TTileImageTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Options {
    attributions?: AttributionLike;
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    opaque?: boolean;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    state?: State;
    tileClass?: typeof ImageTile;
    tileGrid?: TileGrid;
    tileLoadFunction?: LoadFunction;
    tilePixelRatio?: number;
    tileUrlFunction?: UrlFunction;
    url?: string;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
    key?: string;
    zDirection?: number | NearestDirectionFunction;
}
export default class TileImage extends UrlTile {
    constructor(options: Options);
    protected crossOrigin: string;
    protected tileCacheForProjection: { [key: string]: TileCache };
    protected tileClass: typeof ImageTile;
    protected tileGridForProjection: { [key: string]: TileGrid };
    /**
     * Return the key to be used for all tiles in the source.
     */
    protected getKey(): string;
    protected getTileInternal(z: number, x: number, y: number, pixelRatio: number, projection: Projection): Tile;
    canExpireCache(): boolean;
    expireCache(projection: Projection, usedTiles: { [key: string]: boolean }): void;
    getContextOptions(): object | undefined;
    getGutter(): number;
    getGutterForProjection(projection: Projection): number;
    getOpaque(projection: Projection): boolean;
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: Projection): Tile;
    getTileCacheForProjection(projection: Projection): TileCache;
    getTileGridForProjection(projection: Projection): TileGrid;
    /**
     * Sets whether to render reprojection edges or not (usually for debugging).
     */
    setRenderReprojectionEdges(render: boolean): void;
    /**
     * Sets the tile grid to use when reprojecting the tiles to the given
     * projection instead of the default tile grid for the projection.
     * This can be useful when the default tile grid cannot be created
     * (e.g. projection has no extent defined) or
     * for optimization reasons (custom tile size, resolutions, ...).
     */
    setTileGridForProjection(projection: ProjectionLike, tilegrid: TileGrid): void;
    on(type: TTileImageBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TTileImageBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TTileImageBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TTileImageBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TTileImageBaseEventTypes | TTileImageBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TTileImageObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TTileImageObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TTileImageObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TTileImageObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TTileImageObjectEventTypes | TTileImageObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TTileImageTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TTileImageTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TTileImageTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TTileImageTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TTileImageTileSourceEventTypes | TTileImageTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
