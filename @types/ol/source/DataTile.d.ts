import DataTile, { Data } from '../DataTile';
import { ObjectEvent } from '../Object';
import TileCache from '../TileCache';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import { Size } from '../size';
import TileGrid from '../tilegrid/TileGrid';
import { AttributionLike, State } from './Source';
import TileSource, { TileSourceEvent } from './Tile';

export type TDataTileSourceBaseEventTypes = 'change' | 'error';
export type TDataTileSourceObjectEventTypes = 'propertychange';
export type TDataTileSourceTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
/**
 * Data tile loading function.  The function is called with z, x, and y tile coordinates and
 * returns {@link module:ol/DataTile~Data data} for a tile or a promise for the same.
 */
export type Loader = (p0: number, p1: number, p2: number) => Data | Promise<Data>;
export interface Options {
    loader?: Loader | undefined;
    attributions?: AttributionLike | undefined;
    attributionsCollapsible?: boolean | undefined;
    maxZoom?: number | undefined;
    minZoom?: number | undefined;
    tileSize?: number | Size | undefined;
    gutter?: number | undefined;
    maxResolution?: number | undefined;
    projection?: ProjectionLike | undefined;
    tileGrid?: TileGrid | undefined;
    opaque?: boolean | undefined;
    state?: State | undefined;
    wrapX?: boolean | undefined;
    transition?: number | undefined;
    bandCount?: number | undefined;
    interpolate?: boolean | undefined;
}
export default class DataTileSource extends TileSource {
    constructor(options: Options);
    /**
     * Get the source tile size at the given zoom level.  This may be different than the rendered tile
     * size.
     */
    protected getTileSize(z: number): Size;
    protected setLoader(loader: Loader): void;
    /**
     * Set the source tile sizes.  The length of the array is expected to match the number of
     * levels in the tile grid.
     */
    protected setTileSizes(tileSizes: Size[]): void;
    expireCache(projection: Projection, usedTiles: Record<string, boolean>): void;
    getGutterForProjection(projection: Projection): number;
    getReprojTile_(z: number, x: number, y: number, targetProj: Projection, sourceProj: Projection): DataTile;
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: Projection): DataTile;
    getTileCacheForProjection(projection: Projection): TileCache;
    getTileGridForProjection(projection: Projection): TileGrid;
    /**
     * Handle tile change events.
     */
    handleTileChange_(event: BaseEvent): void;
    /**
     * Sets the tile grid to use when reprojecting the tiles to the given
     * projection instead of the default tile grid for the projection.
     * This can be useful when the default tile grid cannot be created
     * (e.g. projection has no extent defined) or
     * for optimization reasons (custom tile size, resolutions, ...).
     */
    setTileGridForProjection(projection: ProjectionLike, tilegrid: TileGrid): void;
    /**
     * Marks a tile coord as being used, without triggering a load.
     */
    useTile(z: number, x: number, y: number, projection: Projection): void;
    on(type: TDataTileSourceBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TDataTileSourceBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TDataTileSourceBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TDataTileSourceBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TDataTileSourceBaseEventTypes | TDataTileSourceBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TDataTileSourceObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TDataTileSourceObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TDataTileSourceObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TDataTileSourceObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TDataTileSourceObjectEventTypes | TDataTileSourceObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TDataTileSourceTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TDataTileSourceTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TDataTileSourceTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TDataTileSourceTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TDataTileSourceTileSourceEventTypes | TDataTileSourceTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
