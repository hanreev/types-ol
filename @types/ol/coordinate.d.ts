import Circle from './geom/Circle';
import Projection from './proj/Projection';

/**
 * An array of numbers representing an xy coordinate. Example: [16, 48].
 */
export type Coordinate = number[];
/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a {string}.
 */
export type CoordinateFormat = (p0: Coordinate | undefined) => string;
/**
 * Add delta to coordinate. coordinate is modified in place and returned
 * by the function.
 * Example:
 * <code>import {add} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * add(coord, [-2, 4]);
 * // coord is now [5.85, 51.983333]</code>
 */
export function add(coordinate: Coordinate, delta: Coordinate): Coordinate;
/**
 * Calculates the point closest to the passed coordinate on the passed circle.
 */
export function closestOnCircle(coordinate: Coordinate, circle: Circle): Coordinate;
/**
 * Calculates the point closest to the passed coordinate on the passed segment.
 * This is the foot of the perpendicular of the coordinate to the segment when
 * the foot is on the segment, or the closest segment coordinate when the foot
 * is outside the segment.
 */
export function closestOnSegment(coordinate: Coordinate, segment: Coordinate[]): Coordinate;
/**
 * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
 * used to format
 * a {Coordinate} to a string.
 * Example without specifying the fractional digits:
 * <code>import {createStringXY} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const stringifyFunc = createStringXY();
 * const out = stringifyFunc(coord);
 * // out is now '8, 48'</code>Example with explicitly specifying 2 fractional digits:
 * <code>import {createStringXY} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const stringifyFunc = createStringXY(2);
 * const out = stringifyFunc(coord);
 * // out is now '7.85, 47.98'</code>
 */
export function createStringXY(fractionDigits?: number): CoordinateFormat;
export function degreesToStringHDMS(hemispheres: string, degrees: number, fractionDigits?: number): string;
export function distance(coord1: Coordinate, coord2: Coordinate): number;
export function equals(coordinate1: Coordinate, coordinate2: Coordinate): boolean;
/**
 * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
 * using the given string template. The strings {x} and {y} in the template
 * will be replaced with the first and second coordinate values respectively.
 * Example without specifying the fractional digits:
 * <code>import {format} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const template = 'Coordinate is ({x}|{y}).';
 * const out = format(coord, template);
 * // out is now 'Coordinate is (8|48).'</code>Example explicitly specifying the fractional digits:
 * <code>import {format} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const template = 'Coordinate is ({x}|{y}).';
 * const out = format(coord, template, 2);
 * // out is now 'Coordinate is (7.85|47.98).'</code>
 */
export function format(coordinate: Coordinate, template: string, fractionDigits?: number): string;
export function getWorldsAway(coordinate: Coordinate, projection: Projection, sourceExtentWidth?: number): number;
/**
 * Rotate coordinate by angle. coordinate is modified in place and
 * returned by the function.
 * Example:
 * <code>import {rotate} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const rotateRadians = Math.PI / 2; // 90 degrees
 * rotate(coord, rotateRadians);
 * // coord is now [-47.983333, 7.85]</code>
 */
export function rotate(coordinate: Coordinate, angle: number): Coordinate;
/**
 * Scale coordinate by scale. coordinate is modified in place and returned
 * by the function.
 * Example:
 * <code>import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const scale = 1.2;
 * scaleCoordinate(coord, scale);
 * // coord is now [9.42, 57.5799996]</code>
 */
export function scale(coordinate: Coordinate, scale: number): Coordinate;
export function squaredDistance(coord1: Coordinate, coord2: Coordinate): number;
/**
 * Calculate the squared distance from a coordinate to a line segment.
 */
export function squaredDistanceToSegment(coordinate: Coordinate, segment: Coordinate[]): number;
/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and
 * seconds.
 * Example without specifying fractional digits:
 * <code>import {toStringHDMS} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const out = toStringHDMS(coord);
 * // out is now '47° 58′ 60″ N 7° 50′ 60″ E'</code>Example explicitly specifying 1 fractional digit:
 * <code>import {toStringHDMS} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const out = toStringHDMS(coord, 1);
 * // out is now '47° 58′ 60.0″ N 7° 50′ 60.0″ E'</code>
 */
export function toStringHDMS(coordinate: Coordinate, fractionDigits?: number): string;
/**
 * Format a coordinate as a comma delimited string.
 * Example without specifying fractional digits:
 * <code>import {toStringXY} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const out = toStringXY(coord);
 * // out is now '8, 48'</code>Example explicitly specifying 1 fractional digit:
 * <code>import {toStringXY} from 'ol/coordinate';
 *
 * const coord = [7.85, 47.983333];
 * const out = toStringXY(coord, 1);
 * // out is now '7.8, 48.0'</code>
 */
export function toStringXY(coordinate: Coordinate, fractionDigits?: number): string;
/**
 * Modifies the provided coordinate in-place to be within the real world
 * extent. The lower projection extent boundary is inclusive, the upper one
 * exclusive.
 */
export function wrapX(coordinate: Coordinate, projection: Projection): Coordinate;
