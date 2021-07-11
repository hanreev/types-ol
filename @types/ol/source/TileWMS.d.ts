import ImageTile from 'ol/ImageTile';
import { ObjectEvent } from 'ol/Object';
import { LoadFunction } from 'ol/Tile';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { ProjectionLike } from 'ol/proj';
import { AttributionLike } from 'ol/source/Source';
import { TileSourceEvent } from 'ol/source/Tile';
import TileImage from 'ol/source/TileImage';
import WMSServerType from 'ol/source/WMSServerType';
import TileGrid from 'ol/tilegrid/TileGrid';

export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: null | string;
    imageSmoothing?: boolean;
    params: { [key: string]: any };
    gutter?: number;
    hidpi?: boolean;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    tileClass?: typeof ImageTile;
    tileGrid?: TileGrid;
    serverType?: WMSServerType | string;
    tileLoadFunction?: LoadFunction;
    url?: string;
    urls?: string[];
    wrapX?: boolean;
    transition?: number;
}
export default class TileWMS extends TileImage {
    constructor(opt_options?: Options & { [key: string]: any });
    /**
     * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
     * projection. Return undefined if the GetFeatureInfo URL cannot be
     * constructed.
     */
    getFeatureInfoUrl(
        coordinate: Coordinate,
        resolution: number,
        projection: ProjectionLike,
        params: any,
    ): string | undefined;
    getGutter(): number;
    /**
     * Return the GetLegendGraphic URL, optionally optimized for the passed
     * resolution and possibly including any passed specific parameters. Returns
     * undefined if the GetLegendGraphic URL cannot be constructed.
     */
    getLegendUrl(resolution?: number, params?: any): string | undefined;
    /**
     * Get the user-provided params, i.e. those passed to the constructor through
     * the "params" option, and possibly updated using the updateParams method.
     */
    getParams(): any;
    /**
     * Get the tile pixel ratio for this source.
     */
    getTilePixelRatio(pixelRatio: number): number;
    /**
     * Update the user-provided params.
     */
    updateParams(params: any): void;
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
