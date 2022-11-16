import { Transform } from '../../transform';

export function rotate(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    angle: number,
    anchor: number[],
    dest?: number[],
): number[];
/**
 * Scale the coordinates.
 */
export function scale(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    sx: number,
    sy: number,
    anchor: number[],
    dest?: number[],
): number[];
export function transform2D(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    transform: Transform,
    dest?: number[],
): number[];
export function translate(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    deltaX: number,
    deltaY: number,
    dest?: number[],
): number[];
