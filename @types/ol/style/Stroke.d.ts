import { Color } from '../color';
import { ColorLike } from '../colorlike';

export interface Options {
    color?: Color | ColorLike | undefined;
    lineCap?: CanvasLineCap | undefined;
    lineJoin?: CanvasLineJoin | undefined;
    lineDash?: number[] | undefined;
    lineDashOffset?: number | undefined;
    miterLimit?: number | undefined;
    width?: number | undefined;
}
export default class Stroke {
    constructor(options?: Options);
    /**
     * Clones the style.
     */
    clone(): Stroke;
    /**
     * Get the stroke color.
     */
    getColor(): Color | ColorLike;
    /**
     * Get the line cap type for the stroke.
     */
    getLineCap(): CanvasLineCap | undefined;
    /**
     * Get the line dash style for the stroke.
     */
    getLineDash(): number[] | null;
    /**
     * Get the line dash offset for the stroke.
     */
    getLineDashOffset(): number | undefined;
    /**
     * Get the line join type for the stroke.
     */
    getLineJoin(): CanvasLineJoin | undefined;
    /**
     * Get the miter limit for the stroke.
     */
    getMiterLimit(): number | undefined;
    /**
     * Get the stroke width.
     */
    getWidth(): number | undefined;
    /**
     * Set the color.
     */
    setColor(color: Color | ColorLike): void;
    /**
     * Set the line cap.
     */
    setLineCap(lineCap: CanvasLineCap | undefined): void;
    /**
     * Set the line dash.
     */
    setLineDash(lineDash: number[] | null): void;
    /**
     * Set the line dash offset.
     */
    setLineDashOffset(lineDashOffset: number | undefined): void;
    /**
     * Set the line join.
     */
    setLineJoin(lineJoin: CanvasLineJoin | undefined): void;
    /**
     * Set the miter limit.
     */
    setMiterLimit(miterLimit: number | undefined): void;
    /**
     * Set the width.
     */
    setWidth(width: number | undefined): void;
}
