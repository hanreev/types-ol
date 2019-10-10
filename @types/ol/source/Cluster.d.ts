import { EventsKey } from '../events';
import BaseEvent from '../events/Event';
import Feature from '../Feature';
import Geometry from '../geom/Geometry';
import Point from '../geom/Point';
import { ObjectEvent } from '../Object';
import { AttributionLike } from './Source';
import VectorSource, { VectorSourceEvent } from './Vector';

export interface Options {
    attributions?: AttributionLike;
    distance?: number;
    geometryFunction?: (p0: Feature) => Point;
    source: VectorSource<Geometry>;
    wrapX?: boolean;
}
export default class Cluster extends VectorSource<GeomType> {
    constructor(options: Options);
    protected distance: number;
    protected features: Feature<GeomType>[];
    protected geometryFunction: (feature: Feature<GeomType>) => Point;
    protected resolution: number;
    protected source: VectorSource<GeomType>;
    protected cluster(): void;
    protected createCluster(features: Feature<GeomType>[]): Feature<GeomType>;
    getDistance(): number;
    getSource(): VectorSource<GeomType>;
    setDistance(distance: number): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on<Geometry>(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once<Geometry>(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un<Geometry>(type: 'addfeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on<Geometry>(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once<Geometry>(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un<Geometry>(type: 'changefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on<Geometry>(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once<Geometry>(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un<Geometry>(type: 'clear', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on<Geometry>(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    once<Geometry>(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): EventsKey;
    un<Geometry>(type: 'removefeature', listener: (evt: VectorSourceEvent<Geometry>) => void): void;
}
