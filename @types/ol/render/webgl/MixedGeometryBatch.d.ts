import Feature from '../../Feature';
import Geometry from '../../geom/Geometry';
import { Transform } from '../../transform';
import WebGLArrayBuffer from '../../webgl/Buffer';

export type GeometryBatch = PointGeometryBatch | LineStringGeometryBatch | PolygonGeometryBatch;
/**
 * Object that holds a reference to a feature as well as the raw coordinates of its various geometries
 */
export interface GeometryBatchItem {
    feature: Feature<Geometry>;
    flatCoordss: number[][];
    verticesCount?: number | undefined;
    ringsCount?: number | undefined;
    ringsVerticesCounts?: number[][] | undefined;
}
/**
 * A geometry batch specific to lines
 */
export interface LineStringGeometryBatch {
    entries: Record<string, GeometryBatchItem>;
    geometriesCount: number;
    renderInstructions: Float32Array;
    verticesBuffer: WebGLArrayBuffer;
    indicesBuffer: WebGLArrayBuffer;
    renderInstructionsTransform: Transform;
    verticesBufferTransform: Transform;
    invertVerticesBufferTransform: Transform;
    verticesCount: number;
}
/**
 * A geometry batch specific to points
 */
export interface PointGeometryBatch {
    entries: Record<string, GeometryBatchItem>;
    geometriesCount: number;
    renderInstructions: Float32Array;
    verticesBuffer: WebGLArrayBuffer;
    indicesBuffer: WebGLArrayBuffer;
    renderInstructionsTransform: Transform;
    verticesBufferTransform: Transform;
    invertVerticesBufferTransform: Transform;
}
/**
 * A geometry batch specific to polygons
 */
export interface PolygonGeometryBatch {
    entries: Record<string, GeometryBatchItem>;
    geometriesCount: number;
    renderInstructions: Float32Array;
    verticesBuffer: WebGLArrayBuffer;
    indicesBuffer: WebGLArrayBuffer;
    renderInstructionsTransform: Transform;
    verticesBufferTransform: Transform;
    invertVerticesBufferTransform: Transform;
    verticesCount: number;
    ringsCount: number;
}
export default class MixedGeometryBatch {
    constructor();
    addFeature(feature: Feature<Geometry>): void;
    addFeatures(features: Feature<Geometry>[]): void;
    changeFeature(feature: Feature<Geometry>): void;
    removeFeature(feature: Feature<Geometry>): void;
}
