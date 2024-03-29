import { FeatureLike } from '../../Feature';
import { Coordinate } from '../../coordinate';
import { Extent } from '../../extent';
import SimpleGeometry from '../../geom/SimpleGeometry';
import { Transform } from '../../transform';
import { BuilderType, SerializableInstructions } from '../canvas';
import RBush from 'rbush';

export default class ExecutorGroup {
    constructor(
        maxExtent: Extent,
        resolution: number,
        pixelRatio: number,
        overlaps: boolean,
        allInstructions: Record<string, Record<BuilderType, SerializableInstructions>>,
        renderBuffer?: number,
    );
    clip(context: CanvasRenderingContext2D, transform: Transform): void;
    execute(
        context: CanvasRenderingContext2D,
        contextScale: number,
        transform: Transform,
        viewRotation: number,
        snapToPixel: boolean,
        builderTypes?: BuilderType[],
        declutterTree?: RBush<any>,
    ): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        resolution: number,
        rotation: number,
        hitTolerance: number,
        callback: (p0: FeatureLike, p1: SimpleGeometry, p2: number) => T,
        declutteredFeatures: FeatureLike[],
    ): T | undefined;
    getClipCoords(transform: Transform): number[] | null;
    hasExecutors(executors: BuilderType[]): boolean;
    isEmpty(): boolean;
}
/**
 * This methods creates an array with indexes of all pixels within a circle,
 * ordered by how close they are to the center.
 * A cache is used to increase performance.
 */
export function getPixelIndexArray(radius: number): number[];
