import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import RenderEvent from '../render/Event';
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer';
import VectorSource from '../source/Vector';
import { LiteralStyle } from '../style/literal';
import Layer from './Layer';

export type TWebGLPointsLayerBaseEventTypes = 'change' | 'error';
export type TWebGLPointsLayerObjectEventTypes =
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
export type TWebGLPointsLayerRenderEventTypes =
    | 'postcompose'
    | 'postrender'
    | 'precompose'
    | 'prerender'
    | 'rendercomplete';
export interface Options<VectorSourceType extends VectorSource = VectorSource> {
    style: LiteralStyle;
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    source?: VectorSourceType;
    disableHitDetection?: boolean;
    properties?: Record<string, any>;
}
export default class WebGLPointsLayer<VectorSourceType extends VectorSource = VectorSource> extends Layer<
    VectorSourceType,
    WebGLPointsLayerRenderer
> {
    constructor(options: Options<VectorSourceType>);
    on(type: TWebGLPointsLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLPointsLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLPointsLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLPointsLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLPointsLayerBaseEventTypes | TWebGLPointsLayerBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TWebGLPointsLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TWebGLPointsLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TWebGLPointsLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TWebGLPointsLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TWebGLPointsLayerObjectEventTypes | TWebGLPointsLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TWebGLPointsLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TWebGLPointsLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TWebGLPointsLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TWebGLPointsLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TWebGLPointsLayerRenderEventTypes | TWebGLPointsLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
