import { FeatureLike } from '../Feature';
import { Coordinate } from '../coordinate';
import Geometry, { Type } from '../geom/Geometry';
import { State } from '../render';
import RenderFeature from '../render/Feature';
import Fill from './Fill';
import ImageStyle from './Image';
import Stroke from './Stroke';
import Text from './Text';

/**
 * A function that takes an {@link module:ol/Feature~Feature} as argument and returns an
 * {@link module:ol/geom/Geometry~Geometry} that will be rendered and styled for the feature.
 */
export type GeometryFunction = (p0: FeatureLike) => Geometry | RenderFeature | undefined;
export interface Options {
    geometry?: string | Geometry | GeometryFunction | undefined;
    fill?: Fill | undefined;
    image?: ImageStyle | undefined;
    renderer?: RenderFunction | undefined;
    hitDetectionRenderer?: RenderFunction | undefined;
    stroke?: Stroke | undefined;
    text?: Text | undefined;
    zIndex?: number | undefined;
}
/**
 * Custom renderer function. Takes two arguments:
 *
 * The pixel coordinates of the geometry in GeoJSON notation.
 * The {@link module:ol/render~State} of the layer renderer.
 *
 */
export type RenderFunction = (p0: Coordinate | Coordinate[] | Coordinate[][], p1: State) => void;
/**
 * A function that takes an {@link module:ol/Feature~Feature} and a {number}
 * representing the view's resolution. The function should return a
 * {@link module:ol/style/Style~Style} or an array of them. This way e.g. a
 * vector layer can be styled. If the function returns undefined, the
 * feature will not be rendered.
 */
export type StyleFunction = (p0: FeatureLike, p1: number) => Style | Style[] | void;
/**
 * A {@link Style}, an array of {@link Style}, or a {@link StyleFunction}.
 */
export type StyleLike = Style | Style[] | StyleFunction;
export default class Style {
    constructor(options?: Options);
    /**
     * Clones the style.
     */
    clone(): Style;
    /**
     * Get the fill style.
     */
    getFill(): Fill;
    /**
     * Get the geometry to be rendered.
     */
    getGeometry(): string | Geometry | GeometryFunction;
    /**
     * Get the function used to generate a geometry for rendering.
     */
    getGeometryFunction(): GeometryFunction;
    /**
     * Get the custom renderer function that was configured with
     * {@link #setHitDetectionRenderer} or the hitDetectionRenderer constructor option.
     */
    getHitDetectionRenderer(): RenderFunction | null;
    /**
     * Get the image style.
     */
    getImage(): ImageStyle;
    /**
     * Get the custom renderer function that was configured with
     * {@link #setRenderer} or the renderer constructor option.
     */
    getRenderer(): RenderFunction | null;
    /**
     * Get the stroke style.
     */
    getStroke(): Stroke;
    /**
     * Get the text style.
     */
    getText(): Text;
    /**
     * Get the z-index for the style.
     */
    getZIndex(): number | undefined;
    /**
     * Set the fill style.
     */
    setFill(fill: Fill): void;
    /**
     * Set a geometry that is rendered instead of the feature's geometry.
     */
    setGeometry(geometry: string | Geometry | GeometryFunction): void;
    /**
     * Sets a custom renderer function for this style used
     * in hit detection.
     */
    setHitDetectionRenderer(renderer: RenderFunction | null): void;
    /**
     * Set the image style.
     */
    setImage(image: ImageStyle): void;
    /**
     * Sets a custom renderer function for this style. When set, fill, stroke
     * and image options of the style will be ignored.
     */
    setRenderer(renderer: RenderFunction | null): void;
    /**
     * Set the stroke style.
     */
    setStroke(stroke: Stroke): void;
    /**
     * Set the text style.
     */
    setText(text: Text): void;
    /**
     * Set the z-index.
     */
    setZIndex(zIndex: number | undefined): void;
}
export function createDefaultStyle(feature: FeatureLike, resolution: number): Style[];
/**
 * Default styles for editing features.
 */
export function createEditingStyle(): Record<Type, Style[]>;
/**
 * Convert the provided object into a style function.  Functions passed through
 * unchanged.  Arrays of Style or single style objects wrapped in a
 * new style function.
 */
export function toFunction(obj: StyleFunction | Style[] | Style): StyleFunction;
