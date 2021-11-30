import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import RenderEvent from '../render/Event';
import WebGLTileLayerRenderer from '../renderer/webgl/TileLayer';
import DataTileSource from '../source/DataTile';
import TileSource from '../source/Tile';
import TileImage from '../source/TileImage';
import { ExpressionValue } from '../style/expressions';
import { UniformValue } from '../webgl/Helper';
import BaseTileLayer from './BaseTile';

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
    source?: SourceType;
    map?: PluggableMap;
    useInterimTilesOnError?: boolean;
    cacheSize?: number;
}
export interface ParsedStyle {
    vertexShader: string;
    fragmentShader: string;
    uniforms: Record<string, UniformValue>;
}
export type SourceType = DataTileSource | TileImage;
/**
 * Translates tile data to rendered pixels.
 */
export interface Style {
    variables?: Record<string, string | number>;
    color?: ExpressionValue;
    brightness?: ExpressionValue;
    contrast?: ExpressionValue;
    exposure?: ExpressionValue;
    saturation?: ExpressionValue;
    gamma?: ExpressionValue;
}
export default class WebGLTileLayer<TileSourceType extends TileSource = TileSource> extends BaseTileLayer<
    TileSourceType,
    WebGLTileLayerRenderer
> {
    constructor(opt_options: Options);
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