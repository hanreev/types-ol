import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { OrderFunction } from '../render';
import RenderEvent from '../render/Event';
import VectorTileLayer from './VectorTile';
import VectorTileRenderType from './VectorTileRenderType';

export type TMapboxVectorLayerBaseEventTypes = 'change' | 'error';
export type TMapboxVectorLayerObjectEventTypes =
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
export type TMapboxVectorLayerRenderEventTypes = 'postrender' | 'prerender';
export interface LayerObject {
    id: string;
    source: string;
}
export interface Options {
    styleUrl: string;
    accessToken: string;
    source?: string;
    layers?: string[];
    declutter?: boolean;
    className?: string;
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    renderOrder?: OrderFunction;
    renderBuffer?: number;
    renderMode?: VectorTileRenderType | string;
    map?: PluggableMap;
    updateWhileAnimating?: boolean;
    updateWhileInteracting?: boolean;
    preload?: number;
    useInterimTilesOnError?: boolean;
    properties?: { [key: string]: any };
}
export interface SourceObject {
    url: string;
    type: SourceType;
}
export interface StyleObject {
    sources: { [key: string]: SourceObject };
    sprite: string;
    glyphs: string;
    layers: LayerObject[];
}
/**
 * The Mapbox source type.
 */
declare enum SourceType {
    VECTOR = 'vector',
}
export default class MapboxVectorLayer extends VectorTileLayer {
    constructor(options: Options);
    /**
     * Fetch the style object.
     */
    protected fetchStyle(styleUrl: string): void;
    /**
     * Handle configuration or loading error.
     */
    protected handleError(error: Error): void;
    /**
     * Handle the loaded style object.
     */
    protected onStyleLoad(style: StyleObject): void;
    on(type: TMapboxVectorLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TMapboxVectorLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TMapboxVectorLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TMapboxVectorLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TMapboxVectorLayerBaseEventTypes | TMapboxVectorLayerBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TMapboxVectorLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TMapboxVectorLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TMapboxVectorLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TMapboxVectorLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TMapboxVectorLayerObjectEventTypes | TMapboxVectorLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TMapboxVectorLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TMapboxVectorLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TMapboxVectorLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TMapboxVectorLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TMapboxVectorLayerRenderEventTypes | TMapboxVectorLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
