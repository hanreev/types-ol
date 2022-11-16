import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { AnimationOptions } from '../View';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Interaction from './Interaction';

export type TLinkBaseEventTypes = 'change' | 'error';
export type TLinkObjectEventTypes = 'change:active' | 'propertychange';
export interface Options {
    animate?: boolean | AnimationOptions | undefined;
    replace?: boolean | undefined;
    prefix?: string | undefined;
}
export default class Link extends Interaction {
    constructor(opt_options?: Options);
    setMap(map: PluggableMap | null): void;
    on(type: TLinkBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TLinkBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TLinkBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TLinkBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TLinkBaseEventTypes | TLinkBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TLinkObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TLinkObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TLinkObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TLinkObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TLinkObjectEventTypes | TLinkObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
}
