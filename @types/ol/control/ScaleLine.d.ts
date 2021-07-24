import MapEvent from '../MapEvent';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Control from './Control';

export type TScaleLineBaseEventTypes = 'change' | 'error';
export type TScaleLineObjectEventTypes = 'change:units' | 'propertychange';
export interface Options {
    className?: string;
    minWidth?: number;
    render?: (p0: MapEvent) => void;
    target?: HTMLElement | string;
    units?: Units | string;
    bar?: boolean;
    steps?: number;
    text?: boolean;
    dpi?: number;
}
/**
 * Units for the scale line. Supported values are 'degrees', 'imperial',
 * 'nautical', 'metric', 'us'.
 */
export enum Units {
    DEGREES = 'degrees',
    IMPERIAL = 'imperial',
    NAUTICAL = 'nautical',
    METRIC = 'metric',
    US = 'us',
}
export default class ScaleLine extends Control {
    constructor(opt_options?: Options);
    /**
     * Creates a marker at given position
     */
    createMarker(position: string, i: number): string;
    /**
     * Creates the label for a marker marker at given position
     */
    createStepText(i: number, width: number, isLast: boolean, scale: number, suffix: string): string;
    /**
     * Returns the appropriate scale for the given resolution and units.
     */
    getScaleForResolution(): number;
    /**
     * Return the units to use in the scale line.
     */
    getUnits(): Units;
    /**
     * Specify the dpi of output device such as printer.
     */
    setDpi(dpi: number | undefined): void;
    /**
     * Set the units to use in the scale line.
     */
    setUnits(units: Units): void;
    on(type: TScaleLineBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TScaleLineBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TScaleLineBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TScaleLineBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TScaleLineBaseEventTypes | TScaleLineBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TScaleLineObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TScaleLineObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TScaleLineObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TScaleLineObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TScaleLineObjectEventTypes | TScaleLineObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
}
