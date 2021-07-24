import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

export type TZoomBaseEventTypes = 'change' | 'error';
export type TZoomObjectEventTypes = 'propertychange';
export interface Options {
    duration?: number;
    className?: string;
    zoomInClassName?: string;
    zoomOutClassName?: string;
    zoomInLabel?: string | HTMLElement;
    zoomOutLabel?: string | HTMLElement;
    zoomInTipLabel?: string;
    zoomOutTipLabel?: string;
    delta?: number;
    target?: HTMLElement | string;
}
export default class Zoom extends Control {
    constructor(opt_options?: Options);
    on(type: TZoomBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TZoomBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TZoomBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TZoomBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TZoomBaseEventTypes | TZoomBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TZoomObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TZoomObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TZoomObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TZoomObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TZoomObjectEventTypes | TZoomObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
}
