import DataTile from '../DataTile';
import { ObjectEvent } from '../Object';
import { ViewOptions } from '../View';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Projection from '../proj/Projection';
import DataTileSource from './DataTile';
import { TileSourceEvent } from './Tile';

export type TGeoTIFFSourceBaseEventTypes = 'change' | 'error';
export type TGeoTIFFSourceObjectEventTypes = 'propertychange';
export type TGeoTIFFSourceTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
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
export interface GeoTIFFImage {
    fileDirectory: any;
    geoKeys: GeoKeys;
    littleEndian: boolean;
    tiles: any;
    isTiled: boolean;
    getBoundingBox: () => number[];
    getOrigin: () => number[];
    getResolution: (p0: GeoTIFFImage) => number[];
}
export interface Options {
    sources: SourceInfo[];
    convertToRGB?: boolean;
    opaque?: boolean;
    transition?: number;
}
export interface SourceInfo {
    url: string;
    overviews?: string[];
    min?: number;
    max?: number;
    nodata?: number;
    bands?: number[];
}
export default class GeoTIFFSource extends DataTileSource {
    constructor(options: Options);
    getError(): Error;
    getTile(z: number, x: number, y: number, pixelRatio: number, projection: Projection): DataTile;
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
