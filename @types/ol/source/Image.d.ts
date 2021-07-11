import ImageWrapper from 'ol/Image';
import ImageBase from 'ol/ImageBase';
import { ObjectEvent } from 'ol/Object';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { AttributionLike } from 'ol/source/Source';
import Source from 'ol/source/Source';
import State from 'ol/source/State';

export interface Options {
    attributions?: AttributionLike;
    imageSmoothing?: boolean;
    projection?: ProjectionLike;
    resolutions?: number[];
    state?: State;
}
export enum ImageSourceEventType {
    IMAGELOADSTART = 'imageloadstart',
    IMAGELOADEND = 'imageloadend',
    IMAGELOADERROR = 'imageloaderror',
}
export default abstract class ImageSource extends Source {
    constructor(options: Options);
    protected findNearestResolution(resolution: number): number;
    protected abstract getImageInternal(
        extent: Extent,
        resolution: number,
        pixelRatio: number,
        projection: Projection,
    ): ImageBase;
    /**
     * Handle image change events.
     */
    protected handleImageChange(event: BaseEvent): void;
    getContextOptions(): object | undefined;
    getImage(extent: Extent, resolution: number, pixelRatio: number, projection: Projection): ImageBase;
    getResolutions(): number[];
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'imageloadend', listener: (evt: ImageSourceEvent) => void): EventsKey;
    once(type: 'imageloadend', listener: (evt: ImageSourceEvent) => void): EventsKey;
    un(type: 'imageloadend', listener: (evt: ImageSourceEvent) => void): void;
    on(type: 'imageloaderror', listener: (evt: ImageSourceEvent) => void): EventsKey;
    once(type: 'imageloaderror', listener: (evt: ImageSourceEvent) => void): EventsKey;
    un(type: 'imageloaderror', listener: (evt: ImageSourceEvent) => void): void;
    on(type: 'imageloadstart', listener: (evt: ImageSourceEvent) => void): EventsKey;
    once(type: 'imageloadstart', listener: (evt: ImageSourceEvent) => void): EventsKey;
    un(type: 'imageloadstart', listener: (evt: ImageSourceEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
export class ImageSourceEvent extends BaseEvent {
    constructor(type: string, image: ImageWrapper);
    /**
     * The image related to the event.
     */
    image: ImageWrapper;
}
/**
 * Default image load function for image sources that use module:ol/Image~Image image
 * instances.
 */
export function defaultImageLoadFunction(image: ImageWrapper, src: string): void;
