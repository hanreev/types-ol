import { LoadFunction } from 'ol/Image';
import ImageWrapper from 'ol/Image';
import { ObjectEvent } from 'ol/Object';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import { ProjectionLike } from 'ol/proj';
import Projection from 'ol/proj/Projection';
import { Size } from 'ol/size';
import ImageSource from 'ol/source/Image';
import { ImageSourceEvent } from 'ol/source/Image';
import { AttributionLike } from 'ol/source/Source';

export interface Options {
    attributions?: AttributionLike;
    crossOrigin?: null | string;
    imageExtent?: Extent;
    imageLoadFunction?: LoadFunction;
    imageSmoothing?: boolean;
    projection?: ProjectionLike;
    imageSize?: Size;
    url: string;
}
export default class Static extends ImageSource {
    constructor(options: Options);
    /**
     * Returns the image extent
     */
    getImageExtent(): Extent;
    getImageInternal(extent: Extent, resolution: number, pixelRatio: number, projection: Projection): ImageWrapper;
    /**
     * Return the URL used for this image source.
     */
    getUrl(): string;
    handleImageChange(evt: BaseEvent): void;
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
