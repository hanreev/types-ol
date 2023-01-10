import { FeatureLike } from '../Feature';
import Map from '../Map';
import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import { Pixel } from '../pixel';
import { OrderFunction } from '../render';
import RenderEvent from '../render/Event';
import CanvasVectorTileLayerRenderer from '../renderer/canvas/VectorTileLayer';
import VectorTile from '../source/VectorTile';
import { StyleLike } from '../style/Style';
import { BackgroundColor } from './Base';
import BaseVectorLayer from './BaseVector';

export type TVectorTileLayerBaseEventTypes = 'change' | 'error' | 'sourceready';
export type TVectorTileLayerObjectEventTypes =
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
export type TVectorTileLayerRenderEventTypes = 'postrender' | 'prerender';
export interface Options {
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
    source?: VectorTile | undefined;
    map?: Map | undefined;
    declutter?: boolean | undefined;
    style?: StyleLike | null | undefined;
    background?: BackgroundColor | false | undefined;
    updateWhileAnimating?: boolean | undefined;
    updateWhileInteracting?: boolean | undefined;
    preload?: number | undefined;
    useInterimTilesOnError?: boolean | undefined;
    properties?: Record<string, any> | undefined;
}
export type VectorTileRenderType = 'hybrid' | 'vector';
export default class VectorTileLayer extends BaseVectorLayer<VectorTile, CanvasVectorTileLayerRenderer> {
    constructor(options?: Options);
    getBackground(): BackgroundColor;
    /**
     * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
     * that resolves with an array of features. The array will either contain the topmost feature
     * when a hit was detected, or it will be empty.
     * The hit detection algorithm used for this method is optimized for performance, but is less
     * accurate than the one used in [map.getFeaturesAtPixel()]{@link module:ol/Map~Map#getFeaturesAtPixel}.
     * Text is not considered, and icons are only represented by their bounding box instead of the exact
     * image.
     */
    getFeatures(pixel: Pixel): Promise<FeatureLike[]>;
    /**
     * Return the level as number to which we will preload tiles up to.
     */
    getPreload(): number;
    getRenderMode(): VectorTileRenderType;
    /**
     * Whether we use interim tiles on error.
     */
    getUseInterimTilesOnError(): boolean;
    setBackground(background: BackgroundColor): void;
    /**
     * Set the level as number to which we will preload tiles up to.
     */
    setPreload(preload: number): void;
    /**
     * Set whether we use interim tiles on error.
     */
    setUseInterimTilesOnError(useInterimTilesOnError: boolean): void;
    on(type: TVectorTileLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TVectorTileLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TVectorTileLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TVectorTileLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TVectorTileLayerBaseEventTypes | TVectorTileLayerBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
    on(type: TVectorTileLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TVectorTileLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TVectorTileLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TVectorTileLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TVectorTileLayerObjectEventTypes | TVectorTileLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TVectorTileLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TVectorTileLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TVectorTileLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TVectorTileLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TVectorTileLayerRenderEventTypes | TVectorTileLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
