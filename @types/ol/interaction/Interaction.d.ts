import Map from '../Map';
import MapBrowserEvent from '../MapBrowserEvent';
import BaseObject, { ObjectEvent } from '../Object';
import View from '../View';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';

export type TInteractionBaseEventTypes = 'change' | 'error';
export type TInteractionObjectEventTypes = 'change:active' | 'propertychange';
/**
 * Object literal with config options for interactions.
 */
export interface InteractionOptions {
    handleEvent: (p0: MapBrowserEvent<UIEvent>) => boolean;
}
export default class Interaction extends BaseObject {
    constructor(options?: InteractionOptions);
    /**
     * Return whether the interaction is currently active.
     */
    getActive(): boolean;
    /**
     * Get the map associated with this interaction.
     */
    getMap(): Map | null;
    /**
     * Handles the {@link module:ol/MapBrowserEvent~MapBrowserEvent map browser event}.
     */
    handleEvent(mapBrowserEvent: MapBrowserEvent<UIEvent>): boolean;
    /**
     * Activate or deactivate the interaction.
     */
    setActive(active: boolean): void;
    /**
     * Remove the interaction from its current map and attach it to the new map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map | null): void;
    on(type: TInteractionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TInteractionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TInteractionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TInteractionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TInteractionBaseEventTypes | TInteractionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TInteractionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TInteractionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TInteractionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TInteractionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TInteractionObjectEventTypes | TInteractionObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
export function pan(view: View, delta: Coordinate, duration?: number): void;
export function zoomByDelta(view: View, delta: number, anchor?: Coordinate, duration?: number): void;
