import { proj4 } from 'proj4';

/**
 * Get the current EPSG lookup function.
 */
export function getEPSGLookup(): (p0: number) => Promise<string>;
export function isRegistered(): boolean;
/**
 * Make projections defined in proj4 (with proj4.defs()) available in
 * OpenLayers. Requires proj4 >= 2.8.0.
 * This function should be called whenever changes are made to the proj4
 * registry, e.g. after calling proj4.defs(). Existing transforms will not be
 * modified by this function.
 */
export function register(proj4: proj4): void;
/**
 * Set the lookup function for getting proj4 definitions given an EPSG code.
 * By default, the {@link module:ol/proj/proj4.fromEPSGCode} function uses the
 * epsg.io website for proj4 definitions.  This can be changed by providing a
 * different lookup function.
 */
export function setEPSGLookup(func: (p0: number) => Promise<string>): void;
/**
 * Unsets the shared proj4 previsouly set with register.
 */
export function unregister(): void;
