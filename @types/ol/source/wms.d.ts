/**
 * Set the server type to use implementation-specific parameters beyond the WMS specification.
 *
 * 'carmentaserver': HiDPI support for Carmenta Server
 * 'geoserver': HiDPI support for GeoServer
 * 'mapserver': HiDPI support for MapServer
 * 'qgis': HiDPI support for QGIS
 *
 */
export type ServerType = 'carmentaserver' | 'geoserver' | 'mapserver' | 'qgis';
/**
 * Default WMS version.
 */
export const DEFAULT_VERSION: string;
