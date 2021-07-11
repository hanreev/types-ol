import Feature from 'ol/Feature';
import { ReadOptions } from 'ol/format/Feature';
import { WriteOptions } from 'ol/format/Feature';
import XMLFeature from 'ol/format/XMLFeature';
import Geometry from 'ol/geom/Geometry';
import Fill from 'ol/style/Fill';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import IconOrigin from 'ol/style/IconOrigin';
import ImageStyle from 'ol/style/Image';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

export interface GxTrackObject {
    flatCoordinates: number[];
    whens: number[];
}
/**
 * A function that takes a url {string} and returns a url {string}.
 * Might be used to change an icon path or to substitute a
 * data url obtained from a KMZ array buffer.
 */
export type IconUrlFunction = (p0: string) => string;
export interface Options {
    extractStyles?: boolean;
    showPointNames?: boolean;
    defaultStyle?: Style[];
    writeStyles?: boolean;
    crossOrigin?: null | string;
    iconUrlFunction?: IconUrlFunction;
}
export interface Vec2 {
    x: number;
    xunits: IconAnchorUnits;
    y: number;
    yunits: IconAnchorUnits;
    origin: IconOrigin;
}
export default class KML extends XMLFeature {
    constructor(opt_options?: Options);
    protected readFeaturesFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>[];
    readFeatureFromNode(node: Element, opt_options?: ReadOptions): Feature<Geometry>;
    /**
     * Read the name of the KML.
     */
    readName(source: Document | Element | string): string | undefined;
    readNameFromDocument(doc: Document): string | undefined;
    readNameFromNode(node: Element): string | undefined;
    /**
     * Read the network links of the KML.
     */
    readNetworkLinks(source: Document | Element | string): object[];
    readNetworkLinksFromDocument(doc: Document): object[];
    readNetworkLinksFromNode(node: Element): object[];
    /**
     * Read the regions of the KML.
     */
    readRegion(source: Document | Element | string): object[];
    readRegionFromDocument(doc: Document): object[];
    readRegionFromNode(node: Element): object[];
    /**
     * Encode an array of features in the KML format as an XML node. GeometryCollections,
     * MultiPoints, MultiLineStrings, and MultiPolygons are output as MultiGeometries.
     */
    writeFeaturesNode(features: Feature<Geometry>[], opt_options?: WriteOptions): Node;
}
/**
 * Get the default fill style (or null if not yet set).
 */
export function getDefaultFillStyle(): Fill;
/**
 * Get the default image style (or null if not yet set).
 */
export function getDefaultImageStyle(): ImageStyle;
/**
 * Get the default stroke style (or null if not yet set).
 */
export function getDefaultStrokeStyle(): Stroke;
/**
 * Get the default style (or null if not yet set).
 */
export function getDefaultStyle(): Style;
/**
 * Get the default style array (or null if not yet set).
 */
export function getDefaultStyleArray(): Style[];
/**
 * Get the default text style (or null if not yet set).
 */
export function getDefaultTextStyle(): Text;
export function readFlatCoordinates(node: Node): number[] | undefined;
