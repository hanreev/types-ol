import Collection from '../Collection';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import Source from '../source/Source';
import State_1 from '../source/State';
import BaseLayer from './Base';
import Layer, { State } from './Layer';

export type TLayerGroupBaseEventTypes = 'change' | 'error';
export type TLayerGroupObjectEventTypes =
    | 'change:extent'
    | 'change:layers'
    | 'change:maxResolution'
    | 'change:maxZoom'
    | 'change:minResolution'
    | 'change:minZoom'
    | 'change:opacity'
    | 'change:visible'
    | 'change:zIndex'
    | 'propertychange';
export interface Options {
    opacity?: number;
    visible?: boolean;
    extent?: Extent;
    zIndex?: number;
    minResolution?: number;
    maxResolution?: number;
    minZoom?: number;
    maxZoom?: number;
    layers?: BaseLayer[] | Collection<BaseLayer>;
    properties?: Record<string, any>;
}
export default class LayerGroup extends BaseLayer {
    constructor(opt_options?: Options);
    /**
     * Returns the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     */
    getLayers(): Collection<BaseLayer>;
    getLayersArray(opt_array?: Layer<Source>[]): Layer<Source>[];
    /**
     * Get the layer states list and use this groups z-index as the default
     * for all layers in this and nested groups, if it is unset at this point.
     * If opt_states is not provided and this group's z-index is undefined
     * 0 is used a the default z-index.
     */
    getLayerStatesArray(opt_states?: State[]): State[];
    getSourceState(): State_1;
    /**
     * Set the {@link module:ol/Collection collection} of {@link module:ol/layer/Layer~Layer layers}
     * in this group.
     */
    setLayers(layers: Collection<BaseLayer>): void;
    on(type: TLayerGroupBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TLayerGroupBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TLayerGroupBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TLayerGroupBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TLayerGroupBaseEventTypes | TLayerGroupBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TLayerGroupObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TLayerGroupObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TLayerGroupObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TLayerGroupObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TLayerGroupObjectEventTypes | TLayerGroupObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
}
