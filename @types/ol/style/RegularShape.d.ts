import ImageState from '../ImageState';
import { ColorLike } from '../colorlike';
import BaseEvent from '../events/Event';
import { Size } from '../size';
import Fill from './Fill';
import ImageStyle from './Image';
import Stroke from './Stroke';

/**
 * Specify radius for regular polygons, or radius1 and radius2 for stars.
 */
export interface Options {
    fill?: Fill | undefined;
    points: number;
    radius?: number | undefined;
    radius1?: number | undefined;
    radius2?: number | undefined;
    angle?: number | undefined;
    displacement?: number[] | undefined;
    stroke?: Stroke | undefined;
    rotation?: number | undefined;
    rotateWithView?: boolean | undefined;
    scale?: number | Size | undefined;
    declutterMode?: 'declutter' | 'obstacle' | 'none' | undefined;
}
export interface RenderOptions {
    strokeStyle?: ColorLike | undefined;
    strokeWidth: number;
    size: number;
    lineDash: number[] | null;
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    miterLimit: number;
}
export default class RegularShape extends ImageStyle {
    constructor(options: Options);
    protected radius_: number;
    protected createRenderOptions(): RenderOptions;
    protected render(): void;
    /**
     * Clones the style.
     */
    clone(): RegularShape;
    /**
     * Get the anchor point in pixels. The anchor determines the center point for the
     * symbolizer.
     */
    getAnchor(): number[];
    /**
     * Get the angle used in generating the shape.
     */
    getAngle(): number;
    /**
     * Get the fill style for the shape.
     */
    getFill(): Fill;
    getHitDetectionImage(): HTMLCanvasElement;
    /**
     * Get the image icon.
     */
    getImage(pixelRatio: number): HTMLCanvasElement;
    getImageSize(): Size;
    getImageState(): ImageState;
    /**
     * Get the origin of the symbolizer.
     */
    getOrigin(): number[];
    /**
     * Get the image pixel ratio.
     */
    getPixelRatio(pixelRatio: number): number;
    /**
     * Get the number of points for generating the shape.
     */
    getPoints(): number;
    /**
     * Get the (primary) radius for the shape.
     */
    getRadius(): number;
    /**
     * Get the secondary radius for the shape.
     */
    getRadius2(): number | undefined;
    /**
     * Get the size of the symbolizer (in pixels).
     */
    getSize(): Size;
    /**
     * Get the stroke style for the shape.
     */
    getStroke(): Stroke;
    listenImageChange(listener: (p0: BaseEvent) => void): void;
    /**
     * Load not yet loaded URI.
     */
    load(): void;
    /**
     * Set the fill style.
     */
    setFill(fill: Fill): void;
    /**
     * Set the stroke style.
     */
    setStroke(stroke: Stroke): void;
    unlistenImageChange(listener: (p0: BaseEvent) => void): void;
}
