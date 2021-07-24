import MapEvent from '../MapEvent';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

export type TRotateBaseEventTypes = 'change' | 'error';
export type TRotateObjectEventTypes = 'propertychange';
export interface Options {
    className?: string;
    label?: string | HTMLElement;
    tipLabel?: string;
    compassClassName?: string;
    duration?: number;
    autoHide?: boolean;
    render?: (p0: MapEvent) => void;
    resetNorth?: () => void;
    target?: HTMLElement | string;
}
export default class Rotate extends Control {
    constructor(opt_options?: Options);
    on(type: TRotateBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TRotateBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TRotateBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TRotateBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TRotateBaseEventTypes | TRotateBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TRotateObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TRotateObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TRotateObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TRotateObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TRotateObjectEventTypes | TRotateObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
}
