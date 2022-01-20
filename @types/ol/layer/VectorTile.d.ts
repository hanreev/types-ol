import Feature from '../Feature';
import { ObjectEvent } from '../Object';
import PluggableMap from '../PluggableMap';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Extent } from '../extent';
import Geometry from '../geom/Geometry';
import { Pixel } from '../pixel';
import { OrderFunction } from '../render';
import RenderEvent from '../render/Event';
import CanvasVectorTileLayerRenderer from '../renderer/canvas/VectorTileLayer';
import VectorTile from '../source/VectorTile';
import { StyleLike } from '../style/Style';
import { BackgroundColor } from './Base';
import BaseVectorLayer from './BaseVector';
import VectorTileRenderType from './VectorTileRenderType';

export type TVectorTileLayerBaseEventTypes = 'change' | 'error';
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
    source?: VectorTile;
    map?: PluggableMap;
    declutter?: boolean;
    style?: StyleLike | null;
    background?: BackgroundColor | false;
    updateWhileAnimating?: boolean;
    updateWhileInteracting?: boolean;
    preload?: number;
    useInterimTilesOnError?: boolean;
    properties?: Record<string, any>;
}
export default class VectorTileLayer extends BaseVectorLayer<VectorTile, CanvasVectorTileLayerRenderer> {
    constructor(opt_options?: Options);
    getBackground(): BackgroundColor;
    /**
     * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
     * that resolves with an array of features. The array will either contain the topmost feature
     * when a hit was detected, or it will be empty.
     * The hit detection algorithm used for this method is optimized for performance, but is less
     * accurate than the one used in {@link module:ol/PluggableMap~PluggableMap#getFeaturesAtPixel map.getFeaturesAtPixel()}: Text
     * is not considered, and icons are only represented by their bounding box instead of the exact
     * image.
     */
    getFeatures(pixel: Pixel): Promise<Feature<Geometry>[]>;
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
