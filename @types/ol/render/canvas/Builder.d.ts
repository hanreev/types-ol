import { FeatureLike } from 'ol/Feature';
import { Extent } from 'ol/extent';
import Geometry from 'ol/geom/Geometry';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import RenderFeature from 'ol/render/Feature';
import VectorContext from 'ol/render/VectorContext';
import { FillStrokeState } from 'ol/render/canvas';
import { SerializableInstructions } from 'ol/render/canvas';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

export default class CanvasBuilder extends VectorContext {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number);
    protected coordinates: number[];
    protected hitDetectionInstructions: any[];
    protected instructions: any[];
    protected maxLineWidth: number;
    protected pixelRatio: number;
    protected state: FillStrokeState;
    protected tolerance: number;
    protected appendFlatLineCoordinates(
        flatCoordinates: number[],
        offset: number,
        end: number,
        stride: number,
        closed: boolean,
        skipFirst: boolean,
    ): number;
    protected appendFlatPointCoordinates(flatCoordinates: number[], stride: number): number;
    protected applyPixelRatio(dashArray: number[]): number[];
    protected beginGeometry(geometry: Geometry | RenderFeature, feature: FeatureLike): void;
    /**
     * Get the buffered rendering extent.  Rendering will be clipped to the extent
     * provided to the constructor.  To account for symbolizers that may intersect
     * this extent, we calculate a buffered extent (e.g. based on stroke width).
     */
    protected getBufferedMaxExtent(): Extent;
    protected maxExtent: Extent;
    protected resolution: number;
    applyStroke(state: FillStrokeState): void;
    createFill(state: FillStrokeState): any[];
    createStroke(state: FillStrokeState): any[];
    drawCustom(geometry: SimpleGeometry, feature: FeatureLike, renderer: () => void): void;
    drawCustomCoordinates_(
        flatCoordinates: number[],
        offset: number,
        ends: number[],
        stride: number,
        builderEnds: number[],
    ): number;
    endGeometry(feature: FeatureLike): void;
    finish(): SerializableInstructions;
    /**
     * Reverse the hit detection instructions.
     */
    reverseHitDetectionInstructions(): void;
    setFillStrokeStyle(fillStyle: Fill, strokeStyle: Stroke): void;
    updateFillStyle(state: FillStrokeState, createFill: (this: CanvasBuilder, p0: FillStrokeState) => any[]): void;
    updateStrokeStyle(state: FillStrokeState, applyStroke: (this: CanvasBuilder, p0: FillStrokeState) => void): void;
}
