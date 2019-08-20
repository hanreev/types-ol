import Collection from '../Collection';
import { Coordinate } from '../coordinate';
import { EventsKey } from '../events';
import Event from '../events/Event';
import { Extent } from '../extent';
import Feature from '../Feature';
import { FeatureLoader, FeatureUrlFunction } from '../featureloader';
import FeatureFormat from '../format/Feature';
import { ObjectEvent } from '../Object';
import Projection from '../proj/Projection';
import Source, { AttributionLike } from './Source';
import { Geometry } from 'ol/geom';

export type LoadingStrategy = (p0: Extent, p1: number) => Extent[];
export interface Options<T extends Feature> {
    attributions?: AttributionLike;
    features?: T[] | Collection<T>;
    format?: FeatureFormat;
    loader?: FeatureLoader;
    overlaps?: boolean;
    strategy?: LoadingStrategy;
    url?: string | FeatureUrlFunction;
    useSpatialIndex?: boolean;
    wrapX?: boolean;
}
export default class VectorSource<T extends Feature = Feature> extends Source {
    constructor(opt_options?: Options<T>);
    protected addFeatureInternal(feature: Feature): void;
    protected addFeaturesInternal(features: Feature[]): void;
    protected removeFeatureInternal(feature: Feature): void;
    addFeature(feature: T): void;
    addFeatures(features: T[]): void;
    clear(opt_fast?: boolean): void;
    forEachFeature(callback: (p0: T) => any): void;
    forEachFeatureAtCoordinateDirect(coordinate: Coordinate, callback: (p0: T) => any): void;
    forEachFeatureInExtent(extent: Extent, callback: (p0: T) => any): void;
    forEachFeatureIntersectingExtent(extent: Extent, callback: (p0: T) => any): void;
    getClosestFeatureToCoordinate(coordinate: Coordinate, opt_filter?: () => void): T;
    getExtent(opt_extent?: Extent): Extent;
    getFeatureById(id: string | number): T;
    getFeatures(): T[];
    getFeaturesAtCoordinate(coordinate: Coordinate): T[];
    getFeaturesCollection(): Collection<T>;
    getFeaturesInExtent(extent: Extent): T[];
    getFormat(): FeatureFormat;
    getOverlaps(): boolean;
    getUrl(): string | FeatureUrlFunction;
    hasFeature(feature: T): boolean;
    isEmpty(): boolean;
    loadFeatures(extent: Extent, resolution: number, projection: Projection): void;
    removeFeature(feature: T): void;
    removeLoadedExtent(extent: Extent): void;
    setLoader(loader: FeatureLoader): void;
    on(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => void): void;
    on(type: 'addfeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    once(type: 'addfeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    un(type: 'addfeature', listener: (evt: VectorSourceEvent<T>) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'changefeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    once(type: 'changefeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    un(type: 'changefeature', listener: (evt: VectorSourceEvent<T>) => void): void;
    on(type: 'clear', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    once(type: 'clear', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    un(type: 'clear', listener: (evt: VectorSourceEvent<T>) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'removefeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    once(type: 'removefeature', listener: (evt: VectorSourceEvent<T>) => void): EventsKey;
    un(type: 'removefeature', listener: (evt: VectorSourceEvent<T>) => void): void;
}
export class VectorSourceEvent<T extends Feature = Feature> extends Event {
    constructor();
    feature: T;
}
