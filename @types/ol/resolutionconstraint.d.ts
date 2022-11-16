import { Extent } from './extent';
import { Size } from './size';

export type Type = (p0: number | undefined, p1: number, p2: Size, p3?: boolean) => number | undefined;
export function createMinMaxResolution(
    maxResolution: number,
    minResolution: number,
    smooth?: boolean,
    maxExtent?: Extent,
    showFullExtent?: boolean,
): Type;
export function createSnapToPower(
    power: number,
    maxResolution: number,
    minResolution?: number,
    smooth?: boolean,
    maxExtent?: Extent,
    showFullExtent?: boolean,
): Type;
export function createSnapToResolutions(
    resolutions: number[],
    smooth?: boolean,
    maxExtent?: Extent,
    showFullExtent?: boolean,
): Type;
