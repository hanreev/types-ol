import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import RenderEvent from '../render/Event';
import WebGLPointsLayerRenderer from '../renderer/webgl/PointsLayer';
import VectorSource from '../source/Vector';
import { LiteralStyle } from '../style/literal';
import Layer from './Layer';

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
    properties?: { [key: string]: any };
}
export default class WebGLPointsLayer<
    VectorSourceType extends VectorSource = VectorSource,
> extends Layer<VectorSourceType> {
    constructor(options: Options<VectorSourceType>);
    /**
     * Create a renderer for this layer.
     */
    createRenderer(): WebGLPointsLayerRenderer;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'change:extent', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:extent', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:extent', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:maxResolution', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:maxResolution', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:maxResolution', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:maxZoom', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:maxZoom', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:maxZoom', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:minResolution', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:minResolution', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:minResolution', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:minZoom', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:minZoom', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:minZoom', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:opacity', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:opacity', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:opacity', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:source', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:source', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:source', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:visible', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:visible', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:visible', listener: (evt: ObjectEvent) => void): void;
    on(type: 'change:zIndex', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:zIndex', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:zIndex', listener: (evt: ObjectEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
    on(type: 'postcompose', listener: (evt: RenderEvent) => void): EventsKey;
    once(type: 'postcompose', listener: (evt: RenderEvent) => void): EventsKey;
    un(type: 'postcompose', listener: (evt: RenderEvent) => void): void;
    on(type: 'postrender', listener: (evt: RenderEvent) => void): EventsKey;
    once(type: 'postrender', listener: (evt: RenderEvent) => void): EventsKey;
    un(type: 'postrender', listener: (evt: RenderEvent) => void): void;
    on(type: 'precompose', listener: (evt: RenderEvent) => void): EventsKey;
    once(type: 'precompose', listener: (evt: RenderEvent) => void): EventsKey;
    un(type: 'precompose', listener: (evt: RenderEvent) => void): void;
    on(type: 'prerender', listener: (evt: RenderEvent) => void): EventsKey;
    once(type: 'prerender', listener: (evt: RenderEvent) => void): EventsKey;
    un(type: 'prerender', listener: (evt: RenderEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'rendercomplete', listener: (evt: RenderEvent) => void): EventsKey;
    once(type: 'rendercomplete', listener: (evt: RenderEvent) => void): EventsKey;
    un(type: 'rendercomplete', listener: (evt: RenderEvent) => void): void;
}
