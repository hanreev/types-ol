import { Extent } from './extent';
import Source from './source/Source';
import { TileCoord } from './tilecoord';
import TileGrid from './tilegrid/TileGrid';

export { default as BingMaps } from './source/BingMaps';
export { default as CartoDB } from './source/CartoDB';
export { default as Cluster } from './source/Cluster';
export { default as DataTile } from './source/DataTile';
export { default as GeoTIFF } from './source/GeoTIFF';
export { default as IIIF } from './source/IIIF';
export { default as Image } from './source/Image';
export { default as ImageArcGISRest } from './source/ImageArcGISRest';
export { default as ImageCanvas } from './source/ImageCanvas';
export { default as ImageMapGuide } from './source/ImageMapGuide';
export { default as ImageStatic } from './source/ImageStatic';
export { default as ImageWMS } from './source/ImageWMS';
export { default as OSM } from './source/OSM';
export { default as Raster } from './source/Raster';
export { default as Source } from './source/Source';
export { default as Stamen } from './source/Stamen';
export { default as Tile } from './source/Tile';
export { default as TileArcGISRest } from './source/TileArcGISRest';
export { default as TileDebug } from './source/TileDebug';
export { default as TileImage } from './source/TileImage';
export { default as TileJSON } from './source/TileJSON';
export { default as TileWMS } from './source/TileWMS';
export { default as UrlTile } from './source/UrlTile';
export { default as UTFGrid } from './source/UTFGrid';
export { default as Vector } from './source/Vector';
export { default as VectorTile } from './source/VectorTile';
export { default as WMTS } from './source/WMTS';
export { default as XYZ } from './source/XYZ';
export { default as Zoomify } from './source/Zoomify';

/**
 * Creates a sources function from a tile grid. This function can be used as value for the
 * sources property of the {@link module:ol/layer/Layer~Layer} subclasses that support it.
 */
export function sourcesFromTileGrid(
    tileGrid: TileGrid,
    factory: (p0: TileCoord) => Source,
): (p0: Extent, p1: number) => Source[];
