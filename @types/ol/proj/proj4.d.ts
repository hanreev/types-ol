/**
 * Make projections defined in proj4 (with proj4.defs()) available in
 * OpenLayers. Requires proj4 >= 2.8.0.
 * This function should be called whenever changes are made to the proj4
 * registry, e.g. after calling proj4.defs(). Existing transforms will not be
 * modified by this function.
 */
export function register(proj4: any): void;
