import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import RenderEvent from '../render/Event';
import LayerRenderer from '../renderer/Layer';
import Source from '../source/Source';
import TileSource from '../source/Tile';
import { ExpressionValue } from '../style/expressions';
import { UniformValue } from '../webgl/Helper';
import BaseTileLayer from './BaseTile';
import Layer from './Layer';

export type TWebGLTileLayerBaseEventTypes = 'change' | 'error';
export type TWebGLTileLayerObjectEventTypes =
    | 'change:extent'
    | 'change:maxResolution'
    | 'change:maxZoom'
    | 'change:minResolution'
    | 'change:minZoom'
    | 'change:opacity'
    | 'change:preload'
    | 'change:source'
    | 'change:useInterimTilesOnError'
    | 'change:visible'
    | 'change:zIndex'
    | 'propertychange';
export type TWebGLTileLayerRenderEventTypes = 'postrender' | 'prerender';
export interface Options {
    style?: Style;
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    preload?: number;
    source?: TileSource;
    map?: PluggableMap;
    useInterimTilesOnError?: boolean;
    cacheSize?: number;
}
export interface ParsedStyle {
    vertexShader: string;
    fragmentShader: string;
    uniforms: Record<string, UniformValue>;
}
/**
 * Translates tile data to rendered pixels.
 */
export interface Style {
    variables?: Record<string, number>;
    color?: ExpressionValue;
    brightness?: ExpressionValue;
    contrast?: ExpressionValue;
    exposure?: ExpressionValue;
    saturation?: ExpressionValue;
    gamma?: ExpressionValue;
}
export default class WebGLTileLayer extends BaseTileLayer {
    constructor(opt_options: Options);
    /**
     * Create a renderer for this layer.
     */
    protected createRenderer(): LayerRenderer<Layer<Source>>;
    /**
     * Clean up underlying WebGL resources.
     */
    dispose(): void;
    /**
     * Update any variables used by the layer style and trigger a re-render.
     */
    updateStyleVariables(variables: Record<string, number>): void;
    on(type: TWebGLTileLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLTileLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLTileLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLTileLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLTileLayerBaseEventTypes | TWebGLTileLayerBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TWebGLTileLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TWebGLTileLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TWebGLTileLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TWebGLTileLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TWebGLTileLayerObjectEventTypes | TWebGLTileLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TWebGLTileLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TWebGLTileLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TWebGLTileLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TWebGLTileLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TWebGLTileLayerRenderEventTypes | TWebGLTileLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
