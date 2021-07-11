import { FeatureLike } from 'ol/Feature';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import SimpleGeometry from 'ol/geom/SimpleGeometry';
import { SerializableInstructions } from 'ol/render/canvas';
import BuilderType from 'ol/render/canvas/BuilderType';
import { Transform } from 'ol/transform';
import RBush from 'rbush';

export default class ExecutorGroup {
    constructor(
        maxExtent: Extent,
        resolution: number,
        pixelRatio: number,
        overlaps: boolean,
        allInstructions: { [key: string]: { [key in BuilderType]: SerializableInstructions } },
        opt_renderBuffer?: number,
    );
    clip(context: CanvasRenderingContext2D, transform: Transform): void;
    execute(
        context: CanvasRenderingContext2D,
        contextScale: number,
        transform: Transform,
        viewRotation: number,
        snapToPixel: boolean,
        opt_builderTypes?: BuilderType[],
        opt_declutterTree?: RBush<any>,
    ): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        resolution: number,
        rotation: number,
        hitTolerance: number,
        callback: (p0: FeatureLike, p1: SimpleGeometry, p2: number) => T,
        declutteredFeatures: FeatureLike[],
    ): T | undefined;
    getClipCoords(transform: Transform): number[];
    hasExecutors(executors: BuilderType[]): boolean;
    isEmpty(): boolean;
}
/**
 * This methods creates an array with indexes of all pixels within a circle,
 * ordered by how close they are to the center.
 * A cache is used to increase performance.
 */
export function getPixelIndexArray(radius: number): number[];
