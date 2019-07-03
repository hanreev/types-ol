import { EventsKey } from '../events';
import Event from '../events/Event';
import { Extent } from '../extent';
import ImageWrapper from '../Image';
import ImageBase from '../ImageBase';
import { ObjectEvent } from '../Object';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import Source, { AttributionLike } from './Source';
import State from './State';

export interface Options {
    attributions?: AttributionLike;
    projection?: ProjectionLike;
    resolutions?: number[];
    state?: State;
}
export enum ImageSourceEventType {
    IMAGELOADSTART = 'imageloadstart',
    IMAGELOADEND = 'imageloadend',
    IMAGELOADERROR = 'imageloaderror',
}
export default class ImageSource extends Source {
    constructor(options: Options);
    protected findNearestResolution(resolution: number): number;
    protected getImageInternal(
        extent: Extent,
        resolution: number,
        pixelRatio: number,
        projection: Projection
    ): ImageBase;
    protected handleImageChange(event: Event): void;
    getImage(extent: Extent, resolution: number, pixelRatio: number, projection: Projection): ImageBase;
    on(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'error', listener: (evt: Event) => void): EventsKey;
    once(type: 'error', listener: (evt: Event) => void): EventsKey;
    un(type: 'error', listener: (evt: Event) => void): void;
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
export class ImageSourceEvent extends Event {
    constructor();
    image: ImageWrapper;
}
export function defaultImageLoadFunction(image: ImageWrapper, src: string): void;
