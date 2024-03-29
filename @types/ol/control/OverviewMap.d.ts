import Collection from '../Collection';
import Map from '../Map';
import MapEvent from '../MapEvent';
import { ObjectEvent } from '../Object';
import View from '../View';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import BaseLayer from '../layer/Base';
import Control from './Control';

export type TOverviewMapBaseEventTypes = 'change' | 'error';
export type TOverviewMapObjectEventTypes = 'propertychange';
export interface Options {
    className?: string | undefined;
    collapsed?: boolean | undefined;
    collapseLabel?: string | HTMLElement | undefined;
    collapsible?: boolean | undefined;
    label?: string | HTMLElement | undefined;
    layers?: BaseLayer[] | Collection<BaseLayer> | undefined;
    render?: ((p0: MapEvent) => void) | undefined;
    rotateWithView?: boolean | undefined;
    target?: HTMLElement | string | undefined;
    tipLabel?: string | undefined;
    view?: View | undefined;
}
export default class OverviewMap extends Control {
    constructor(options?: Options);
    /**
     * Determine if the overview map is collapsed.
     */
    getCollapsed(): boolean;
    /**
     * Return true if the overview map is collapsible, false otherwise.
     */
    getCollapsible(): boolean;
    /**
     * Return the overview map.
     */
    getOverviewMap(): Map;
    /**
     * Return true if the overview map view can rotate, false otherwise.
     */
    getRotateWithView(): boolean;
    /**
     * Collapse or expand the overview map according to the passed parameter. Will
     * not do anything if the overview map isn't collapsible or if the current
     * collapsed state is already the one requested.
     */
    setCollapsed(collapsed: boolean): void;
    /**
     * Set whether the overview map should be collapsible.
     */
    setCollapsible(collapsible: boolean): void;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass null to just remove the control from the current map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map | null): void;
    /**
     * Set whether the overview map view should rotate with the main map view.
     */
    setRotateWithView(rotateWithView: boolean): void;
    on(type: TOverviewMapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TOverviewMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TOverviewMapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TOverviewMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TOverviewMapBaseEventTypes | TOverviewMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TOverviewMapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TOverviewMapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TOverviewMapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TOverviewMapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TOverviewMapObjectEventTypes | TOverviewMapObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
