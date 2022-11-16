import { Coordinate } from '../../coordinate';

export function interpolatePoint(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    fraction: number,
    dest?: number[],
    dimension?: number,
): number[];
export function lineStringCoordinateAtM(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    m: number,
    extrapolate: boolean,
): Coordinate | null;
export function lineStringsCoordinateAtM(
    flatCoordinates: number[],
    offset: number,
    ends: number[],
    stride: number,
    m: number,
    extrapolate: boolean,
    interpolate: boolean,
): Coordinate | null;
