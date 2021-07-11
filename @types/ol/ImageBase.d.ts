import ImageState from 'ol/ImageState';
import Target from 'ol/events/Target';
import { Extent } from 'ol/extent';

export default abstract class ImageBase extends Target {
    constructor(extent: Extent, resolution: number | undefined, pixelRatio: number, state: ImageState);
    protected extent: Extent;
    protected resolution: number;
    protected state: ImageState;
    protected changed(): void;
    getExtent(): Extent;
    abstract getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    getPixelRatio(): number;
    getResolution(): number;
    getState(): ImageState;
    /**
     * Load not yet loaded URI.
     */
    abstract load(): void;
}
