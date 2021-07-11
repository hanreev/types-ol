import Collection from '../Collection';
import Feature from '../Feature';
import MapBrowserEvent from '../MapBrowserEvent';
import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Geometry from '../geom/Geometry';
import { Pixel } from '../pixel';
import VectorSource from '../source/Vector';
import PointerInteraction from './Pointer';

export interface Options {
    features?: Collection<Feature<Geometry>>;
    edge?: boolean;
    vertex?: boolean;
    pixelTolerance?: number;
    source?: VectorSource<Geometry>;
}
export interface Result {
    snapped: boolean;
    vertex: Coordinate | null;
    vertexPixel: Pixel | null;
}
export interface SegmentData {
    feature: Feature<Geometry>;
    segment: Coordinate[];
}
export default class Snap extends PointerInteraction {
    constructor(opt_options?: Options & { [key: string]: any });
    /**
     * Add a feature to the collection of features that we may snap to.
     */
    addFeature(feature: Feature<Geometry>, opt_listen?: boolean): void;
    handleEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handle pointer up events.
     */
    handleUpEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Remove a feature from the collection of features that we may snap to.
     */
    removeFeature(feature: Feature<Geometry>, opt_unlisten?: boolean): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: PluggableMap): void;
    snapTo(pixel: Pixel, pixelCoordinate: Coordinate, map: PluggableMap): Result;
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
