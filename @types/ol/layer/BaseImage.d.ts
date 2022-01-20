import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import RenderEvent from '../render/Event';
import LayerRenderer from '../renderer/Layer';
import ImageSource from '../source/Image';
import Layer from './Layer';

export type TBaseImageLayerBaseEventTypes = 'change' | 'error';
export type TBaseImageLayerObjectEventTypes =
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
export type TBaseImageLayerRenderEventTypes = 'postrender' | 'prerender';
export interface Options<ImageSourceType extends ImageSource = ImageSource> {
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    map?: PluggableMap;
    source?: ImageSourceType;
    properties?: Record<string, any>;
}
export default class BaseImageLayer<
    ImageSourceType extends ImageSource = ImageSource,
    RendererType extends LayerRenderer = LayerRenderer,
> extends Layer<ImageSourceType, RendererType> {
    constructor(opt_options?: Options<ImageSourceType>);
    on(type: TBaseImageLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TBaseImageLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TBaseImageLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TBaseImageLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TBaseImageLayerBaseEventTypes | TBaseImageLayerBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TBaseImageLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TBaseImageLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TBaseImageLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TBaseImageLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TBaseImageLayerObjectEventTypes | TBaseImageLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TBaseImageLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TBaseImageLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TBaseImageLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TBaseImageLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TBaseImageLayerRenderEventTypes | TBaseImageLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
