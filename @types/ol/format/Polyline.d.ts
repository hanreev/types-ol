import Feature from '../Feature';
import Geometry, { GeometryLayout } from '../geom/Geometry';
import LineString from '../geom/LineString';
import { ReadOptions, WriteOptions } from './Feature';
import TextFeature from './TextFeature';

export interface Options {
    factor?: number | undefined;
    geometryLayout?: GeometryLayout | undefined;
}
export default class Polyline extends TextFeature {
    constructor(options?: Options);
    protected readFeatureFromText(text: string, options?: ReadOptions): Feature<Geometry>;
    protected readFeaturesFromText(text: string, options?: ReadOptions): Feature<Geometry>[];
    protected readGeometryFromText(text: string, options?: ReadOptions): Geometry;
    protected writeFeaturesText(features: Feature<LineString>[], options?: WriteOptions): string;
    protected writeFeatureText(feature: Feature<LineString>, options?: WriteOptions): string;
    protected writeGeometryText(geometry: LineString, options?: WriteOptions): string;
}
/**
 * Decode a list of n-dimensional points from an encoded string
 */
export function decodeDeltas(encoded: string, stride: number, factor?: number): number[];
/**
 * Decode a list of floating point numbers from an encoded string
 */
export function decodeFloats(encoded: string, factor?: number): number[];
/**
 * Decode a list of signed integers from an encoded string
 */
export function decodeSignedIntegers(encoded: string): number[];
/**
 * Decode a list of unsigned integers from an encoded string
 */
export function decodeUnsignedIntegers(encoded: string): number[];
/**
 * Encode a list of n-dimensional points and return an encoded string
 * Attention: This function will modify the passed array!
 */
export function encodeDeltas(numbers: number[], stride: number, factor?: number): string;
/**
 * Encode a list of floating point numbers and return an encoded string
 * Attention: This function will modify the passed array!
 */
export function encodeFloats(numbers: number[], factor?: number): string;
/**
 * Encode a list of signed integers and return an encoded string
 * Attention: This function will modify the passed array!
 */
export function encodeSignedIntegers(numbers: number[]): string;
/**
 * Encode one single unsigned integer and return an encoded string
 */
export function encodeUnsignedInteger(num: number): string;
/**
 * Encode a list of unsigned integers and return an encoded string
 */
export function encodeUnsignedIntegers(numbers: number[]): string;
