import Collection from '../Collection';
import Feature, { FeatureLike } from '../Feature';
import MapBrowserEvent from '../MapBrowserEvent';
import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Condition } from '../events/condition';
import Geometry from '../geom/Geometry';
import SimpleGeometry from '../geom/SimpleGeometry';
import BaseVectorLayer from '../layer/BaseVector';
import VectorLayer from '../layer/Vector';
import VectorSource from '../source/Vector';
import VectorTile from '../source/VectorTile';
import { StyleLike } from '../style/Style';
import PointerInteraction from './Pointer';

export interface Options {
    condition?: Condition;
    deleteCondition?: Condition;
    insertVertexCondition?: Condition;
    pixelTolerance?: number;
    style?: StyleLike;
    source?: VectorSource<Geometry>;
    hitDetection?: boolean | BaseVectorLayer<VectorSource<Geometry> | VectorTile>;
    features?: Collection<Feature<Geometry>>;
    wrapX?: boolean;
    snapToPointer?: boolean;
}
export interface SegmentData {
    depth?: number[];
    feature: FeatureLike;
    geometry: SimpleGeometry;
    index?: number;
    segment: number[][];
    featureSegments?: SegmentData[];
}
declare enum ModifyEventType {
    MODIFYSTART = 'modifystart',
    MODIFYEND = 'modifyend',
}
export default class Modify extends PointerInteraction {
    constructor(options: Options);
    /**
     * Get the overlay layer that this interaction renders the modification point or vertex to.
     */
    getOverlay(): VectorLayer<VectorSource<Geometry>>;
    /**
     * Handle pointer down events.
     */
    handleDownEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handle pointer drag events.
     */
    handleDragEvent(evt: MapBrowserEvent<UIEvent>): void;
    /**
     * Handles the {@link module:ol/MapBrowserEvent map browser event} and may modify the geometry.
     */
    handleEvent(mapBrowserEvent: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Handle pointer up events.
     */
    handleUpEvent(evt: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Removes the vertex currently being pointed.
     */
    removePoint(): boolean;
    /**
     * Activate or deactivate the interaction.
     */
    setActive(active: boolean): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: PluggableMap): void;
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
    on(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifyend', listener: (evt: ModifyEvent) => void): void;
    on(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifystart', listener: (evt: ModifyEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
}
export class ModifyEvent extends BaseEvent {
    constructor(type: ModifyEventType, features: Collection<FeatureLike>, MapBrowserEvent: MapBrowserEvent<UIEvent>);
    /**
     * The features being modified.
     */
    features: Collection<FeatureLike>;
    /**
     * Associated {@link module:ol/MapBrowserEvent}.
     */
    mapBrowserEvent: MapBrowserEvent<UIEvent>;
}
