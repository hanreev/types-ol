export function arrayMaxSquaredDelta(
    flatCoordinates: number[],
    offset: number,
    ends: number[],
    stride: number,
    max: number,
): number;
export function assignClosestArrayPoint(
    flatCoordinates: number[],
    offset: number,
    ends: number[],
    stride: number,
    maxDelta: number,
    isRing: boolean,
    x: number,
    y: number,
    closestPoint: number[],
    minSquaredDistance: number,
    tmpPoint?: number[],
): number;
export function assignClosestMultiArrayPoint(
    flatCoordinates: number[],
    offset: number,
    endss: number[][],
    stride: number,
    maxDelta: number,
    isRing: boolean,
    x: number,
    y: number,
    closestPoint: number[],
    minSquaredDistance: number,
    tmpPoint?: number[],
): number;
export function assignClosestPoint(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    maxDelta: number,
    isRing: boolean,
    x: number,
    y: number,
    closestPoint: number[],
    minSquaredDistance: number,
    tmpPoint?: number[],
): number;
/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 */
export function maxSquaredDelta(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    max: number,
): number;
export function multiArrayMaxSquaredDelta(
    flatCoordinates: number[],
    offset: number,
    endss: number[][],
    stride: number,
    max: number,
): number;
