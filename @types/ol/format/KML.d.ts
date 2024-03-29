import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import Fill from '../style/Fill';
import { IconAnchorUnits, IconOrigin } from '../style/Icon';
import ImageStyle from '../style/Image';
import Stroke from '../style/Stroke';
import Style from '../style/Style';
import Text from '../style/Text';
import { ReadOptions, WriteOptions } from './Feature';
import XMLFeature from './XMLFeature';

export interface GxTrackObject {
    coordinates: number[][];
    whens: number[];
}
/**
 * A function that takes a url {string} and returns a url {string}.
 * Might be used to change an icon path or to substitute a
 * data url obtained from a KMZ array buffer.
 */
export type IconUrlFunction = (p0: string) => string;
export interface Options {
    extractStyles?: boolean | undefined;
    showPointNames?: boolean | undefined;
    defaultStyle?: Style[] | undefined;
    writeStyles?: boolean | undefined;
    crossOrigin?: null | string | undefined;
    iconUrlFunction?: IconUrlFunction | undefined;
}
export interface Vec2 {
    x: number;
    xunits: IconAnchorUnits;
    y: number;
    yunits: IconAnchorUnits;
    origin?: IconOrigin | undefined;
}
export default class KML extends XMLFeature {
    constructor(options?: Options);
    protected readFeaturesFromNode(node: Element, options?: ReadOptions): Feature<Geometry>[];
    readFeatureFromNode(node: Element, options?: ReadOptions): Feature<Geometry>;
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
    writeFeaturesNode(features: Feature<Geometry>[], options?: WriteOptions): Node;
}
/**
 * Get the default fill style (or null if not yet set).
 */
export function getDefaultFillStyle(): Fill | null;
/**
 * Get the default image style (or null if not yet set).
 */
export function getDefaultImageStyle(): ImageStyle | null;
/**
 * Get the default stroke style (or null if not yet set).
 */
export function getDefaultStrokeStyle(): Stroke | null;
/**
 * Get the default style (or null if not yet set).
 */
export function getDefaultStyle(): Style | null;
/**
 * Get the default style array (or null if not yet set).
 */
export function getDefaultStyleArray(): Style[] | null;
/**
 * Get the default text style (or null if not yet set).
 */
export function getDefaultTextStyle(): Text | null;
export function readFlatCoordinates(node: Node): number[] | undefined;
