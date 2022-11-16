import ImageState from '../ImageState';
import { Color } from '../color';
import BaseEvent from '../events/Event';
import { Size } from '../size';
import ImageStyle from './Image';

/**
 * Anchor unit can be either a fraction of the icon size or in pixels.
 */
export type IconAnchorUnits = 'fraction' | 'pixels';
/**
 * Icon origin. One of 'bottom-left', 'bottom-right', 'top-left', 'top-right'.
 */
export type IconOrigin = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export interface Options {
    anchor?: number[] | undefined;
    anchorOrigin?: IconOrigin | undefined;
    anchorXUnits?: IconAnchorUnits | undefined;
    anchorYUnits?: IconAnchorUnits | undefined;
    color?: Color | string | undefined;
    crossOrigin?: null | string | undefined;
    img?: HTMLImageElement | HTMLCanvasElement | undefined;
    imgSize?: Size | undefined;
    displacement?: number[] | undefined;
    opacity?: number | undefined;
    scale?: number | Size | undefined;
    rotateWithView?: boolean | undefined;
    rotation?: number | undefined;
    offset?: number[] | undefined;
    offsetOrigin?: IconOrigin | undefined;
    size?: Size | undefined;
    src?: string | undefined;
    declutterMode?: 'declutter' | 'obstacle' | 'none' | undefined;
}
export default class Icon extends ImageStyle {
    constructor(options?: Options);
    /**
     * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
     */
    clone(): Icon;
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     */
    getAnchor(): number[];
    /**
     * Get the icon color.
     */
    getColor(): Color;
    getHitDetectionImage(): HTMLImageElement | HTMLCanvasElement;
    /**
     * Get the image icon.
     */
    getImage(pixelRatio: number): HTMLImageElement | HTMLCanvasElement;
    getImageSize(): Size;
    getImageState(): ImageState;
    /**
     * Get the origin of the symbolizer.
     */
    getOrigin(): number[];
    /**
     * Get the pixel ratio.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * Get the size of the icon (in pixels).
     */
    getSize(): Size;
    /**
     * Get the image URL.
     */
    getSrc(): string | undefined;
    listenImageChange(listener: (p0: BaseEvent) => void): void;
    /**
     * Load not yet loaded URI.
     * When rendering a feature with an icon style, the vector renderer will
     * automatically call this method. However, you might want to call this
     * method yourself for preloading or other purposes.
     */
    load(): void;
    /**
     * Set the anchor point. The anchor determines the center point for the
     * symbolizer.
     */
    setAnchor(anchor: number[]): void;
    unlistenImageChange(listener: (p0: BaseEvent) => void): void;
}
