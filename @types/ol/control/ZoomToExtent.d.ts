import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import Control from './Control';

export type TZoomToExtentBaseEventTypes = 'change' | 'error';
export type TZoomToExtentObjectEventTypes = 'propertychange';
export interface Options {
    className?: string;
    target?: HTMLElement | string;
    label?: string | HTMLElement;
    tipLabel?: string;
    extent?: Extent;
}
export default class ZoomToExtent extends Control {
    constructor(opt_options?: Options);
    protected extent: Extent;
    protected handleZoomToExtent(): void;
    on(type: TZoomToExtentBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TZoomToExtentBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TZoomToExtentBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TZoomToExtentBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TZoomToExtentBaseEventTypes | TZoomToExtentBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TZoomToExtentObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TZoomToExtentObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TZoomToExtentObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TZoomToExtentObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TZoomToExtentObjectEventTypes | TZoomToExtentObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
