import { Coordinate } from '../../coordinate';

export function inflateCoordinates(
    flatCoordinates: number[],
    offset: number,
    end: number,
    stride: number,
    coordinates?: Coordinate[],
): Coordinate[];
export function inflateCoordinatesArray(
    flatCoordinates: number[],
    offset: number,
    ends: number[],
    stride: number,
    coordinatess?: Coordinate[][],
): Coordinate[][];
export function inflateMultiCoordinatesArray(
    flatCoordinates: number[],
    offset: number,
    endss: number[][],
    stride: number,
    coordinatesss?: Coordinate[][][],
): Coordinate[][][];
