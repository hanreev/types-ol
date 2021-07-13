import ImageWrapper from '../Image';
import ImageBase from '../ImageBase';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import Source, { AttributionLike } from './Source';
import State from './State';

export type ImageSourceEventTypes = 'imageloadend' | 'imageloaderror' | 'imageloadstart';
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
