import Feature from 'ol/Feature';
import { ObjectEvent } from 'ol/Object';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import Geometry from 'ol/geom/Geometry';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { AttributionLike } from 'ol/source/Source';
import VectorSource from 'ol/source/Vector';
import { VectorSourceEvent } from 'ol/source/Vector';

export interface Options {
    attributions?: AttributionLike;
    distance?: number;
    geometryFunction?: (p0: Feature<Geometry>) => Point;
    source?: VectorSource<Geometry>;
    wrapX?: boolean;
}
export default class Cluster extends VectorSource {
    constructor(options: Options);
    protected distance: number;
    protected features: Feature<Geometry>[];
    protected geometryFunction: (feature: Feature<Geometry>) => Point;
    protected resolution: number;
    protected cluster(): void;
    protected createCluster(features: Feature<Geometry>[]): Feature<Geometry>;
    /**
     * Remove all features from the source.
     */
    clear(opt_fast?: boolean): void;
    /**
     * Get the distance in pixels between clusters.
     */
    getDistance(): number;
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
     * Set the distance in pixels between clusters.
     */
    setDistance(distance: number): void;
    /**
     * Replace the wrapped source.
     */
    setSource(source: VectorSource<Geometry>): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
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
