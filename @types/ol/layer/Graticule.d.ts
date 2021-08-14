import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import LineString from '../geom/LineString';
import Point from '../geom/Point';
import Projection from '../proj/Projection';
import RenderEvent from '../render/Event';
import VectorSource from '../source/Vector';
import Stroke from '../style/Stroke';
import Text from '../style/Text';
import VectorLayer from './Vector';

export type TGraticuleBaseEventTypes = 'change' | 'error';
export type TGraticuleObjectEventTypes =
    | 'change:extent'
    | 'change:maxResolution'
    | 'change:maxZoom'
    | 'change:minResolution'
    | 'change:minZoom'
    | 'change:opacity'
    | 'change:source'
    | 'change:visible'
    | 'change:zIndex'
    | 'propertychange';
export type TGraticuleRenderEventTypes = 'postcompose' | 'postrender' | 'precompose' | 'prerender' | 'rendercomplete';
export interface GraticuleLabelDataType {
    geom: Point;
    text: string;
}
export interface Options {
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    maxLines?: number;
    strokeStyle?: Stroke;
    targetSize?: number;
    showLabels?: boolean;
    lonLabelFormatter?: (p0: number) => string;
    latLabelFormatter?: (p0: number) => string;
    lonLabelPosition?: number;
    latLabelPosition?: number;
    lonLabelStyle?: Text;
    latLabelStyle?: Text;
    intervals?: number[];
    wrapX?: boolean;
    properties?: Record<string, any>;
}
export default class Graticule extends VectorLayer<VectorSource> {
    constructor(opt_options?: Options);
    /**
     * Get the list of meridians.  Meridians are lines of equal longitude.
     */
    getMeridians(): LineString[];
    /**
     * Get the list of parallels.  Parallels are lines of equal latitude.
     */
    getParallels(): LineString[];
    /**
     * Update geometries in the source based on current view
     */
    loaderFunction(extent: Extent, resolution: number, projection: Projection): void;
    /**
     * Strategy function for loading features based on the view's extent and
     * resolution.
     */
    strategyFunction(extent: Extent, resolution: number): Extent[];
    on(type: TGraticuleBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TGraticuleBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TGraticuleBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TGraticuleBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TGraticuleBaseEventTypes | TGraticuleBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TGraticuleObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TGraticuleObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TGraticuleObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TGraticuleObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TGraticuleObjectEventTypes | TGraticuleObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TGraticuleRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TGraticuleRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TGraticuleRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TGraticuleRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(type: TGraticuleRenderEventTypes | TGraticuleRenderEventTypes[], listener: ListenerFunction<RenderEvent>): void;
}
