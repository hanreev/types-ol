import { Corner, Extent } from './extent';
import { ProjectionLike } from './proj';
import Projection from './proj/Projection';
import { Size } from './size';
import { TileCoord } from './tilecoord';
import TileGrid from './tilegrid/TileGrid';

export interface XYZOptions {
    extent?: Extent | undefined;
    maxResolution?: number | undefined;
    maxZoom?: number | undefined;
    minZoom?: number | undefined;
    tileSize?: number | Size | undefined;
}
export function createForExtent(extent: Extent, maxZoom?: number, tileSize?: number | Size, corner?: Corner): TileGrid;
export function createForProjection(
    projection: ProjectionLike,
    maxZoom?: number,
    tileSize?: number | Size,
    corner?: Corner,
): TileGrid;
/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 */
export function createXYZ(options?: XYZOptions): TileGrid;
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 */
export function extentFromProjection(projection: ProjectionLike): Extent;
export function getForProjection(projection: Projection): TileGrid;
export function wrapX(tileGrid: TileGrid, tileCoord: TileCoord, projection: Projection): TileCoord;
