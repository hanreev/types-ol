import ImageState from '../ImageState';
import BaseEvent from '../events/Event';
import { Size } from '../size';

export interface Options {
    opacity: number;
    rotateWithView: boolean;
    rotation: number;
    scale: number | Size;
    displacement: number[];
    declutterMode: 'declutter' | 'obstacle' | 'none';
}
export default abstract class ImageStyle {
    constructor(options: Options);
    /**
     * Clones the style.
     */
    clone(): ImageStyle;
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     */
    abstract getAnchor(): number[];
    /**
     * Get the declutter mode of the shape
     */
    getDeclutterMode(): 'declutter' | 'obstacle' | 'none' | undefined;
    /**
     * Get the displacement of the shape
     */
    getDisplacement(): number[];
    abstract getHitDetectionImage(): HTMLCanvasElement | HTMLVideoElement | HTMLImageElement;
    /**
     * Get the image element for the symbolizer.
     */
    abstract getImage(pixelRatio: number): HTMLCanvasElement | HTMLVideoElement | HTMLImageElement;
    abstract getImageSize(): Size;
    abstract getImageState(): ImageState;
    /**
     * Get the symbolizer opacity.
     */
    getOpacity(): number;
    /**
     * Get the origin of the symbolizer.
     */
    abstract getOrigin(): number[];
    /**
     * Get the image pixel ratio.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * Determine whether the symbolizer rotates with the map.
     */
    getRotateWithView(): boolean;
    /**
     * Get the symoblizer rotation.
     */
    getRotation(): number;
    /**
     * Get the symbolizer scale.
     */
    getScale(): number | Size;
    /**
     * Get the symbolizer scale array.
     */
    getScaleArray(): Size;
    /**
     * Get the size of the symbolizer (in pixels).
     */
    abstract getSize(): Size;
    abstract listenImageChange(listener: (p0: BaseEvent) => void): void;
    /**
     * Load not yet loaded URI.
     */
    abstract load(): void;
    /**
     * Set the displacement.
     */
    setDisplacement(displacement: number[]): void;
    /**
     * Set the opacity.
     */
    setOpacity(opacity: number): void;
    /**
     * Set whether to rotate the style with the view.
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Set the rotation.
     */
    setRotation(rotation: number): void;
    /**
     * Set the scale.
     */
    setScale(scale: number | Size): void;
    abstract unlistenImageChange(listener: (p0: BaseEvent) => void): void;
}
