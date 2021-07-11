import Projection from 'ol/proj/Projection';

export function greatCircleArc(
    lon1: number,
    lat1: number,
    lon2: number,
    lat2: number,
    projection: Projection,
    squaredTolerance: number,
): number[];
/**
 * Generate a meridian (line at constant longitude).
 */
export function meridian(
    lon: number,
    lat1: number,
    lat2: number,
    projection: Projection,
    squaredTolerance: number,
): number[];
/**
 * Generate a parallel (line at constant latitude).
 */
export function parallel(
    lat: number,
    lon1: number,
    lon2: number,
    projection: Projection,
    squaredTolerance: number,
): number[];
