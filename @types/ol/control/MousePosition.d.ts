import Map from '../Map';
import MapEvent from '../MapEvent';
import { ObjectEvent } from '../Object';
import { CoordinateFormat } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { ProjectionLike } from '../proj';
import Projection from '../proj/Projection';
import Control from './Control';

export type TMousePositionBaseEventTypes = 'change' | 'error';
export type TMousePositionObjectEventTypes = 'change:coordinateFormat' | 'change:projection' | 'propertychange';
export interface Options {
    className?: string | undefined;
    coordinateFormat?: CoordinateFormat | undefined;
    projection?: ProjectionLike | undefined;
    render?: ((p0: MapEvent) => void) | undefined;
    target?: HTMLElement | string | undefined;
    placeholder?: string | undefined;
    wrapX?: boolean | undefined;
}
export default class MousePosition extends Control {
    constructor(options?: Options);
    protected handleMouseMove(event: MouseEvent): void;
    protected handleMouseOut(event: Event): void;
    /**
     * Return the coordinate format type used to render the current position or
     * undefined.
     */
    getCoordinateFormat(): CoordinateFormat | undefined;
    /**
     * Return the projection that is used to report the mouse position.
     */
    getProjection(): Projection | undefined;
    /**
     * Set the coordinate format type used to render the current position.
     */
    setCoordinateFormat(format: CoordinateFormat): void;
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass null to just remove the control from the current map.
     * Subclasses may set up event handlers to get notified about changes to
     * the map here.
     */
    setMap(map: Map | null): void;
    /**
     * Set the projection that is used to report the mouse position.
     */
    setProjection(projection: ProjectionLike): void;
    on(type: TMousePositionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TMousePositionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TMousePositionBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TMousePositionBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TMousePositionBaseEventTypes | TMousePositionBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TMousePositionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TMousePositionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TMousePositionObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TMousePositionObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TMousePositionObjectEventTypes | TMousePositionObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
