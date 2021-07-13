import Feature from '../Feature';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import Geometry from '../geom/Geometry';
import Point from '../geom/Point';
import Projection from '../proj/Projection';
import { AttributionLike } from './Source';
import VectorSource, { VectorSourceEvent } from './Vector';

export interface Options {
    attributions?: AttributionLike;
    distance?: number;
    minDistance?: number;
    geometryFunction?: (p0: Feature<Geometry>) => Point;
    source?: VectorSource<Geometry>;
    wrapX?: boolean;
}
export default class Cluster extends VectorSource {
    constructor(options: Options);
    protected distance: number;
    protected features: Feature<Geometry>[];
    protected geometryFunction: (feature: Feature<Geometry>) => Point;
    protected interpolationRatio: number;
    protected minDistance: number;
    protected resolution: number;
    protected source: VectorSource<Geometry>;
    protected cluster(): void;
    protected createCluster(features: Feature<Geometry>[], extent: Extent): Feature<Geometry>;
    /**
     * Remove all features from the source.
     */
    clear(opt_fast?: boolean): void;
    /**
     * Get the distance in pixels between clusters.
     */
    getDistance(): number;
    /**
     * The configured minimum distance between clusters.
     */
    getMinDistance(): number;
    getResolutions(): number[] | undefined;
    /**
     * Get a reference to the wrapped source.
     */
    getSource(): VectorSource<Geometry>;
    loadFeatures(extent: Extent, resolution: number, projection: Projection): void;
    /**
     * Handle the source changing.
     */
    refresh(): void;
    /**
     * Set the distance within which features will be clusterd together.
     */
    setDistance(distance: number): void;
    /**
     * Set the minimum distance between clusters. Will be capped at the
     * configured distance.
     */
    setMinDistance(minDistance: number): void;
    /**
     * Replace the wrapped source.
     */
    setSource(source: VectorSource<Geometry>): void;
    /**
     * Update the distances and refresh the source if necessary.
     */
    updateDistance(distance: number, minDistance: number): void;
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
    on(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloadend', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloaderror', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'featuresloadstart', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
}
