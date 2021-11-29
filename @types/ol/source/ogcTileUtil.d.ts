import { UrlFunction } from '../Tile';
import Projection from '../proj/Projection';
import TileGrid from '../tilegrid/TileGrid';

export type CornerOfOrigin = 'topLeft' | 'bottomLeft';
export interface Link {
    rel: string;
    href: string;
    type: string;
}
export interface SourceInfo {
    url: string;
    mediaType: string;
    supportedMediaTypes?: string[];
    projection: Projection;
    context?: any;
}
export interface TileMatrix {
    id: string;
    cellSize: number;
    pointOfOrigin: number[];
    cornerOfOrigin?: CornerOfOrigin;
    matrixWidth: number;
    matrixHeight: number;
    tileWidth: number;
    tileHeight: number;
}
export interface TileMatrixSet {
    id: string;
    crs: string;
    tileMatrices: TileMatrix[];
}
export interface TileMatrixSetLimit {
    tileMatrix: string;
    minTileRow: number;
    maxTileRow: number;
    minTileCol: number;
    maxTileCol: number;
}
export interface TileSet {
    dataType: TileType;
    tileMatrixSetDefinition?: string;
    tileMatrixSet?: TileMatrixSet;
    tileMatrixSetLimits?: TileMatrixSetLimit[];
    links: Link[];
}
export interface TileSetInfo {
    urlTemplate: string;
    grid: TileGrid;
    urlFunction: UrlFunction;
}
export type TileType = 'map' | 'vector';
export function getMapTileUrlTemplate(links: Link[], mediaType?: string): string;
export function getTileSetInfo(sourceInfo: SourceInfo): Promise<TileSetInfo>;
export function getVectorTileUrlTemplate(links: Link[], mediaType?: string, supportedMediaTypes?: string[]): string;
