import { Extent } from '../extent';
import GeometryType from '../geom/GeometryType';
import { ProjectionLike } from '../proj';

export default class RenderFeature {
    constructor(type: GeometryType, flatCoordinates: number[], ends: number[] | number[][], properties: { [key: string]: any }, id: number | string);
    getId(): number | string;
    get(key: string): any;
    getFlatInteriorPoint(): number[];
    getFlatInteriorPoints(): number[];
    getFlatMidpoint(): number[];
    getFlatMidpoints(): number[];
    getGeometry(): RenderFeature;
    getExtent(): Extent;
    getOrientedFlatCoordinates(): number[];
    getProperties(): { [key: string]: any };
    getSimplifiedGeometry(squaredTolerance: number): RenderFeature;
    getStride(): number;
    getStyleFunction(): any;
    getType(): GeometryType;
    transform(source: ProjectionLike, destination: ProjectionLike): void;
}
