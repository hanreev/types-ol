import { ObjectEvent } from '../Object';
import { ViewOptions } from '../View';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Projection from '../proj/Projection';
import DataTileSource from './DataTile';
import { TileSourceEvent } from './Tile';
import { GeoTIFF as GeoTIFF_1, GeoTIFFImage as GeoTIFFImage_1, MultiGeoTIFF as MultiGeoTIFF_1 } from 'geotiff';

export type TGeoTIFFSourceBaseEventTypes = 'change' | 'error';
export type TGeoTIFFSourceObjectEventTypes = 'propertychange';
export type TGeoTIFFSourceTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface GDALMetadata {
    STATISTICS_MINIMUM: string;
    STATISTICS_MAXIMUM: string;
}
export interface GeoKeys {
    GTModelTypeGeoKey: number;
    GTRasterTypeGeoKey: number;
    GeogAngularUnitsGeoKey: number;
    GeogInvFlatteningGeoKey: number;
    GeogSemiMajorAxisGeoKey: number;
    GeographicTypeGeoKey: number;
    ProjLinearUnitsGeoKey: number;
    ProjectedCSTypeGeoKey: number;
}
export type GeoTIFF = GeoTIFF_1;
export type GeoTIFFImage = GeoTIFFImage_1;
export interface GeoTIFFSourceOptions {
    forceXHR?: boolean | undefined;
    headers?: Record<string, string> | undefined;
    credentials?: string | undefined;
    maxRanges?: number | undefined;
    allowFullFile?: boolean | undefined;
    blockSize?: number | undefined;
    cacheSize?: number | undefined;
}
export type MultiGeoTIFF = MultiGeoTIFF_1;
export interface Options {
    sources: SourceInfo[];
    sourceOptions?: GeoTIFFSourceOptions | undefined;
    convertToRGB?: true | false | 'auto' | undefined;
    normalize?: boolean | undefined;
    opaque?: boolean | undefined;
    transition?: number | undefined;
    wrapX?: boolean | undefined;
    interpolate?: boolean | undefined;
}
export interface SourceInfo {
    url?: string | undefined;
    overviews?: string[] | undefined;
    blob?: Blob | undefined;
    min?: number | undefined;
    max?: number | undefined;
    nodata?: number | undefined;
    bands?: number[] | undefined;
}
export default class GeoTIFFSource extends DataTileSource {
    constructor(options: Options);
    /**
     * Determine the projection of the images in this GeoTIFF.
     * The default implementation looks at the ProjectedCSTypeGeoKey and the GeographicTypeGeoKey
     * of each image in turn.
     * You can override this method in a subclass to support more projections.
     */
    determineProjection(sources: GeoTIFFImage[][]): void;
    getError(): Error;
    /**
     * Get a promise for view properties based on the source.  Use the result of this function
     * as the view option in a map constructor.
     * <code>const source = new GeoTIFF(options);
     *
     * const map = new Map({
     *   target: 'map',
     *   layers: [
     *     new TileLayer({
     *       source: source,
     *     }),
     *   ],
     *   view: source.getView(),
     * });</code>
     */
    getView(): Promise<ViewOptions>;
    /**
     * Marks a tile coord as being used, without triggering a load.
     */
    useTile(z: number, x: number, y: number, projection: Projection): void;
    on(type: TGeoTIFFSourceBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TGeoTIFFSourceBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TGeoTIFFSourceBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TGeoTIFFSourceBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TGeoTIFFSourceBaseEventTypes | TGeoTIFFSourceBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TGeoTIFFSourceObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TGeoTIFFSourceObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TGeoTIFFSourceObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TGeoTIFFSourceObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TGeoTIFFSourceObjectEventTypes | TGeoTIFFSourceObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TGeoTIFFSourceTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TGeoTIFFSourceTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TGeoTIFFSourceTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TGeoTIFFSourceTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TGeoTIFFSourceTileSourceEventTypes | TGeoTIFFSourceTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
