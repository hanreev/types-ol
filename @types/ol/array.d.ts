/**
 * {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution} can use a function
 * of this type to determine which nearest resolution to use.
 * This function takes a {number} representing a value between two array entries,
 * a {number} representing the value of the nearest higher entry and
 * a {number} representing the value of the nearest lower entry
 * as arguments and returns a {number}. If a negative number or zero is returned
 * the lower value will be used, if a positive number is returned the higher value
 * will be used.
 */
export type NearestDirectionFunction = (p0: number, p1: number, p2: number) => number;
/**
 * Compare function sorting arrays in ascending order.  Safe to use for numeric values.
 */
export function ascending(a: any, b: any): number;
/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 */
export function binarySearch(haystack: any[], needle: any, comparator?: () => void): number;
export function equals(arr1: any[] | Uint8ClampedArray, arr2: any[] | Uint8ClampedArray): boolean;
export function extend<VALUE>(arr: VALUE[], data: VALUE[] | VALUE): void;
export function isSorted(arr: any[], func?: () => void, strict?: boolean): boolean;
export function linearFindNearest(arr: number[], target: number, direction: number | NearestDirectionFunction): number;
export function remove<VALUE>(arr: VALUE[], obj: VALUE): boolean;
export function reverseSubArray(arr: any[], begin: number, end: number): void;
/**
 * Sort the passed array such that the relative order of equal elements is preserved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 */
export function stableSort(arr: any[], compareFnc: (p0: any, p1: any) => number): void;
