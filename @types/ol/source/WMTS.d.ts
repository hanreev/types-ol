import ImageTile from '../ImageTile';
import { ObjectEvent } from '../Object';
import { LoadFunction, UrlFunction } from '../Tile';
import { NearestDirectionFunction } from '../array';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import WMTSTileGrid from '../tilegrid/WMTS';
import { AttributionLike } from './Source';
import { TileSourceEvent } from './Tile';
import TileImage from './TileImage';
import WMTSRequestEncoding from './WMTSRequestEncoding';

export type TWMTSBaseEventTypes = 'change' | 'error';
export type TWMTSObjectEventTypes = 'propertychange';
export type TWMTSTileSourceEventTypes = 'tileloadend' | 'tileloaderror' | 'tileloadstart';
export interface Options {
    attributions?: AttributionLike;
    attributionsCollapsible?: boolean;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    tileGrid: WMTSTileGrid;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    requestEncoding?: WMTSRequestEncoding | string;
    layer: string;
    style: string;
    tileClass?: typeof ImageTile;
    tilePixelRatio?: number;
    format?: string;
    version?: string;
    matrixSet: string;
    dimensions?: any;
    url?: string;
    tileLoadFunction?: LoadFunction;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
    zDirection?: number | NearestDirectionFunction;
}
export default class WMTS extends TileImage {
    constructor(options: Options);
    createFromWMTSTemplate(template: string): UrlFunction;
    /**
     * Get the dimensions, i.e. those passed to the constructor through the
     * "dimensions" option, and possibly updated using the updateDimensions
     * method.
     */
    getDimensions(): any;
    /**
     * Return the image format of the WMTS source.
     */
    getFormat(): string;
    /**
     * Return the layer of the WMTS source.
     */
    getLayer(): string;
    /**
     * Return the matrix set of the WMTS source.
     */
    getMatrixSet(): string;
    /**
     * Return the request encoding, either "KVP" or "REST".
     */
    getRequestEncoding(): WMTSRequestEncoding;
    /**
     * Return the style of the WMTS source.
     */
    getStyle(): string;
    /**
     * Return the version of the WMTS source.
     */
    getVersion(): string;
    /**
     * Set the URLs to use for requests.
     * URLs may contain OGC conform URL Template Variables: {TileMatrix}, {TileRow}, {TileCol}.
     */
    setUrls(urls: string[]): void;
    /**
     * Update the dimensions.
     */
    updateDimensions(dimensions: any): void;
    on(type: TWMTSBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWMTSBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWMTSBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWMTSBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TWMTSBaseEventTypes | TWMTSBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TWMTSObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TWMTSObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TWMTSObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TWMTSObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TWMTSObjectEventTypes | TWMTSObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TWMTSTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    on(type: TWMTSTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    once(type: TWMTSTileSourceEventTypes, listener: ListenerFunction<TileSourceEvent>): EventsKey;
    once(type: TWMTSTileSourceEventTypes[], listener: ListenerFunction<TileSourceEvent>): EventsKey[];
    un(
        type: TWMTSTileSourceEventTypes | TWMTSTileSourceEventTypes[],
        listener: ListenerFunction<TileSourceEvent>,
    ): void;
}
/**
 * Generate source options from a capabilities object.
 */
export function optionsFromCapabilities(wmtsCap: any, config: any): Options;
