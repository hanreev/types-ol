import { Size } from '../size';
import Fill from './Fill';
import Stroke from './Stroke';

export interface Options {
    font?: string | undefined;
    maxAngle?: number | undefined;
    offsetX?: number | undefined;
    offsetY?: number | undefined;
    overflow?: boolean | undefined;
    placement?: TextPlacement | undefined;
    scale?: number | Size | undefined;
    rotateWithView?: boolean | undefined;
    rotation?: number | undefined;
    text?: string | string[] | undefined;
    textAlign?: CanvasTextAlign | undefined;
    justify?: TextJustify | undefined;
    textBaseline?: CanvasTextBaseline | undefined;
    fill?: Fill | undefined;
    stroke?: Stroke | undefined;
    backgroundFill?: Fill | undefined;
    backgroundStroke?: Stroke | undefined;
    padding?: number[] | undefined;
}
export type TextJustify = 'left' | 'center' | 'right';
/**
 * Default text placement is 'point'. Note that
 * 'line' requires the underlying geometry to be a {@link module:ol/geom/LineString~LineString},
 * {@link module:ol/geom/Polygon~Polygon}, {@link module:ol/geom/MultiLineString~MultiLineString} or
 * {@link module:ol/geom/MultiPolygon~MultiPolygon}.
 */
export type TextPlacement = 'point' | 'line';
export default class Text {
    constructor(options?: Options);
    /**
     * Clones the style.
     */
    clone(): Text;
    /**
     * Get the background fill style for the text.
     */
    getBackgroundFill(): Fill;
    /**
     * Get the background stroke style for the text.
     */
    getBackgroundStroke(): Stroke;
    /**
     * Get the fill style for the text.
     */
    getFill(): Fill;
    /**
     * Get the font name.
     */
    getFont(): string | undefined;
    /**
     * Get the justification.
     */
    getJustify(): TextJustify | undefined;
    /**
     * Get the maximum angle between adjacent characters.
     */
    getMaxAngle(): number;
    /**
     * Get the x-offset for the text.
     */
    getOffsetX(): number;
    /**
     * Get the y-offset for the text.
     */
    getOffsetY(): number;
    /**
     * Get the overflow configuration.
     */
    getOverflow(): boolean;
    /**
     * Get the padding for the text.
     */
    getPadding(): number[] | null;
    /**
     * Get the label placement.
     */
    getPlacement(): TextPlacement;
    /**
     * Determine whether the text rotates with the map.
     */
    getRotateWithView(): boolean | undefined;
    /**
     * Get the text rotation.
     */
    getRotation(): number | undefined;
    /**
     * Get the text scale.
     */
    getScale(): number | Size | undefined;
    /**
     * Get the symbolizer scale array.
     */
    getScaleArray(): Size;
    /**
     * Get the stroke style for the text.
     */
    getStroke(): Stroke;
    /**
     * Get the text to be rendered.
     */
    getText(): string | string[] | undefined;
    /**
     * Get the text alignment.
     */
    getTextAlign(): CanvasTextAlign | undefined;
    /**
     * Get the text baseline.
     */
    getTextBaseline(): CanvasTextBaseline | undefined;
    /**
     * Set the background fill.
     */
    setBackgroundFill(fill: Fill): void;
    /**
     * Set the background stroke.
     */
    setBackgroundStroke(stroke: Stroke): void;
    /**
     * Set the fill.
     */
    setFill(fill: Fill): void;
    /**
     * Set the font.
     */
    setFont(font: string | undefined): void;
    /**
     * Set the justification.
     */
    setJustify(justify: TextJustify | undefined): void;
    /**
     * Set the maximum angle between adjacent characters.
     */
    setMaxAngle(maxAngle: number): void;
    /**
     * Set the x offset.
     */
    setOffsetX(offsetX: number): void;
    /**
     * Set the y offset.
     */
    setOffsetY(offsetY: number): void;
    /**
     * Set the overflow property.
     */
    setOverflow(overflow: boolean): void;
    /**
     * Set the padding ([top, right, bottom, left]).
     */
    setPadding(padding: number[] | null): void;
    /**
     * Set the text placement.
     */
    setPlacement(placement: TextPlacement): void;
    /**
     * Set whether to rotate the text with the view.
     */
    setRotateWithView(rotateWithView: boolean): void;
    /**
     * Set the rotation.
     */
    setRotation(rotation: number | undefined): void;
    /**
     * Set the scale.
     */
    setScale(scale: number | Size | undefined): void;
    /**
     * Set the stroke.
     */
    setStroke(stroke: Stroke): void;
    /**
     * Set the text.
     */
    setText(text: string | string[] | undefined): void;
    /**
     * Set the text alignment.
     */
    setTextAlign(textAlign: CanvasTextAlign | undefined): void;
    /**
     * Set the text baseline.
     */
    setTextBaseline(textBaseline: CanvasTextBaseline | undefined): void;
}
