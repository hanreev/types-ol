import Collection from '../Collection';
import Feature from '../Feature';
import Map from '../Map';
import MapBrowserEvent from '../MapBrowserEvent';
import { ObjectEvent } from '../Object';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Geometry from '../geom/Geometry';
import { Pixel } from '../pixel';
import VectorSource from '../source/Vector';
import PointerInteraction from './Pointer';

export type TSnapBaseEventTypes = 'change' | 'error';
export type TSnapObjectEventTypes = 'change:active' | 'propertychange';
export interface Options {
    features?: Collection<Feature<Geometry>> | undefined;
    edge?: boolean | undefined;
    vertex?: boolean | undefined;
    pixelTolerance?: number | undefined;
    source?: VectorSource<Geometry> | undefined;
}
export interface Result {
    vertex: Coordinate | null;
    vertexPixel: Pixel | null;
}
export interface SegmentData {
    feature: Feature<Geometry>;
    segment: Coordinate[];
}
export default class Snap extends PointerInteraction {
    constructor(options?: Options);
    /**
     * Add a feature to the collection of features that we may snap to.
     */
    addFeature(feature: Feature<Geometry>, register?: boolean): void;
    handleEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handle pointer up events.
     */
    handleUpEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Remove a feature from the collection of features that we may snap to.
     */
    removeFeature(feature: Feature<Geometry>, unlisten?: boolean): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map): void;
    snapTo(pixel: Pixel, pixelCoordinate: Coordinate, map: Map): Result | null;
    on(type: TSnapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TSnapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TSnapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TSnapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TSnapBaseEventTypes | TSnapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TSnapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TSnapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TSnapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TSnapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TSnapObjectEventTypes | TSnapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
}
