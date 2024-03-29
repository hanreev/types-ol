import Map from '../Map';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { OrderFunction } from '../render';
import RenderEvent from '../render/Event';
import { BackgroundColor } from './Base';
import VectorTileLayer, { VectorTileRenderType } from './VectorTile';

export type TMapboxVectorLayerBaseEventTypes = 'change' | 'error' | 'sourceready';
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
export interface Options {
    styleUrl: string;
    accessToken?: string | undefined;
    source?: string | undefined;
    layers?: string[] | undefined;
    declutter?: boolean | undefined;
    background?: BackgroundColor | false | undefined;
    className?: string | undefined;
    opacity?: number | undefined;
    visible?: boolean | undefined;
    extent?: Extent | undefined;
    zIndex?: number | undefined;
    minResolution?: number | undefined;
    maxResolution?: number | undefined;
    minZoom?: number | undefined;
    maxZoom?: number | undefined;
    renderOrder?: OrderFunction | undefined;
    renderBuffer?: number | undefined;
    renderMode?: VectorTileRenderType | undefined;
    map?: Map | undefined;
    updateWhileAnimating?: boolean | undefined;
    updateWhileInteracting?: boolean | undefined;
    preload?: number | undefined;
    useInterimTilesOnError?: boolean | undefined;
    properties?: Record<string, any> | undefined;
}
export default class MapboxVectorLayer extends VectorTileLayer {
    constructor(options: Options);
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
