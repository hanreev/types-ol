import Collection from './Collection';
import { FeatureLike } from './Feature';
import MapBrowserEvent from './MapBrowserEvent';
import MapEvent from './MapEvent';
import BaseObject, { ObjectEvent } from './Object';
import Types from './ObjectEventType';
import Overlay from './Overlay';
import Tile from './Tile';
import TileQueue from './TileQueue';
import View, { State, ViewOptions } from './View';
import Control from './control/Control';
import { Coordinate } from './coordinate';
import { EventsKey, ListenerFunction } from './events';
import BaseEvent from './events/Event';
import { Extent } from './extent';
import SimpleGeometry from './geom/SimpleGeometry';
import Interaction from './interaction/Interaction';
import BaseLayer from './layer/Base';
import LayerGroup from './layer/Group';
import Layer, { State as State_1 } from './layer/Layer';
import { Pixel } from './pixel';
import RenderEvent from './render/Event';
import LayerRenderer from './renderer/Layer';
import MapRenderer from './renderer/Map';
import { Size } from './size';
import Source from './source/Source';
import { Transform } from './transform';
import RBush from 'rbush';

export type TMapBaseEventTypes = 'change' | 'error';
export type TMapObjectEventTypes =
    | 'change:layerGroup'
    | 'change:size'
    | 'change:target'
    | 'change:view'
    | 'propertychange';
export type TMapMapBrowserEventTypes = 'click' | 'dblclick' | 'pointerdrag' | 'pointermove' | 'singleclick';
export type TMapMapEventTypes = 'loadend' | 'loadstart' | 'moveend' | 'movestart' | 'postrender';
export type TMapRenderEventTypes = 'postcompose' | 'precompose' | 'rendercomplete';
export interface AtPixelOptions {
    layerFilter?: ((p0: Layer<Source>) => boolean) | undefined;
    hitTolerance?: number | undefined;
    checkWrapped?: boolean | undefined;
}
/**
 * State of the current frame. Only pixelRatio, time and viewState should
 * be used in applications.
 */
export interface FrameState {
    pixelRatio: number;
    time: number;
    viewState: State;
    animate: boolean;
    coordinateToPixelTransform: Transform;
    declutterTree: RBush<any>;
    extent: null | Extent;
    nextExtent?: Extent | undefined;
    index: number;
    layerStatesArray: State_1[];
    layerIndex: number;
    pixelToCoordinateTransform: Transform;
    postRenderFunctions: PostRenderFunction[];
    size: Size;
    tileQueue: TileQueue;
    usedTiles: Record<string, Record<string, boolean>>;
    viewHints: number[];
    wantedTiles: Record<string, Record<string, boolean>>;
    mapId: string;
    renderTargets: Record<string, boolean>;
}
export type MapObjectEventTypes = Types | 'change:layergroup' | 'change:size' | 'change:target' | 'change:view';
/**
 * Object literal with config options for the map.
 */
export interface MapOptions {
    controls?: Collection<Control> | Control[] | undefined;
    pixelRatio?: number | undefined;
    interactions?: Collection<Interaction> | Interaction[] | undefined;
    keyboardEventTarget?: HTMLElement | Document | string | undefined;
    layers?: BaseLayer[] | Collection<BaseLayer> | LayerGroup | undefined;
    maxTilesLoading?: number | undefined;
    moveTolerance?: number | undefined;
    overlays?: Collection<Overlay> | Overlay[] | undefined;
    target?: HTMLElement | string | undefined;
    view?: View | Promise<ViewOptions> | undefined;
}
export interface MapOptionsInternal {
    controls?: Collection<Control> | undefined;
    interactions?: Collection<Interaction> | undefined;
    keyboardEventTarget: HTMLElement | Document;
    overlays: Collection<Overlay>;
    values: Record<string, any>;
}
export type PostRenderFunction = (p0: Map, p1: FrameState) => any;
export default class Map extends BaseObject {
    constructor(options?: MapOptions);
    protected controls: Collection<Control>;
    protected interactions: Collection<Interaction>;
    protected handlePostRender(): void;
    /**
     * Add the given control to the map.
     */
    addControl(control: Control): void;
    /**
     * Add the given interaction to the map. If you want to add an interaction
     * at another point of the collection use getInteractions() and the methods
     * available on {@link module:ol/Collection~Collection}. This can be used to
     * stop the event propagation from the handleEvent function. The interactions
     * get to handle the events in the reverse order of this collection.
     */
    addInteraction(interaction: Interaction): void;
    /**
     * Adds the given layer to the top of this map. If you want to add a layer
     * elsewhere in the stack, use getLayers() and the methods available on
     * {@link module:ol/Collection~Collection}.
     */
    addLayer(layer: BaseLayer): void;
    /**
     * Add the given overlay to the map.
     */
    addOverlay(overlay: Overlay): void;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    /**
     * Detect features that intersect a pixel on the viewport, and execute a
     * callback with each intersecting feature. Layers included in the detection can
     * be configured through the layerFilter option in options.
     */
    forEachFeatureAtPixel<T>(
        pixel: Pixel,
        callback: (p0: FeatureLike, p1: Layer<Source>, p2: SimpleGeometry) => T,
        options?: AtPixelOptions,
    ): T | undefined;
    /**
     * Get all layers from all layer groups.
     */
    getAllLayers(): Layer<Source, LayerRenderer>[];
    /**
     * Get the map controls. Modifying this collection changes the controls
     * associated with the map.
     */
    getControls(): Collection<Control>;
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * user projection.
     */
    getCoordinateFromPixel(pixel: Pixel): Coordinate;
    /**
     * Get the coordinate for a given pixel.  This returns a coordinate in the
     * map view projection.
     */
    getCoordinateFromPixelInternal(pixel: Pixel): Coordinate;
    /**
     * Returns the coordinate in user projection for a browser event.
     */
    getEventCoordinate(event: MouseEvent): Coordinate;
    /**
     * Returns the coordinate in view projection for a browser event.
     */
    getEventCoordinateInternal(event: MouseEvent): Coordinate;
    /**
     * Returns the map pixel position for a browser event relative to the viewport.
     */
    getEventPixel(event: UIEvent): Pixel;
    /**
     * Get all features that intersect a pixel on the viewport.
     */
    getFeaturesAtPixel(pixel: Pixel, options?: AtPixelOptions): FeatureLike[];
    /**
     * Get the map interactions. Modifying this collection changes the interactions
     * associated with the map.
     * Interactions are used for e.g. pan, zoom and rotate.
     */
    getInteractions(): Collection<Interaction>;
    /**
     * Get the layergroup associated with this map.
     */
    getLayerGroup(): LayerGroup;
    /**
     * Get the collection of layers associated with this map.
     */
    getLayers(): Collection<BaseLayer>;
    getLoadingOrNotReady(): boolean;
    /**
     * Get an overlay by its identifier (the value returned by overlay.getId()).
     * Note that the index treats string and numeric identifiers as the same. So
     * map.getOverlayById(2) will return an overlay with id '2' or 2.
     */
    getOverlayById(id: string | number): Overlay;
    /**
     * Get the element that serves as the container for overlays.  Elements added to
     * this container will let mousedown and touchstart events through to the map,
     * so clicks and gestures on an overlay will trigger {@link module:ol/MapBrowserEvent~MapBrowserEvent}
     * events.
     */
    getOverlayContainer(): HTMLElement;
    /**
     * Get the element that serves as a container for overlays that don't allow
     * event propagation. Elements added to this container won't let mousedown and
     * touchstart events through to the map, so clicks and gestures on an overlay
     * don't trigger any {@link module:ol/MapBrowserEvent~MapBrowserEvent}.
     */
    getOverlayContainerStopEvent(): HTMLElement;
    /**
     * Get the map overlays. Modifying this collection changes the overlays
     * associated with the map.
     */
    getOverlays(): Collection<Overlay>;
    getOwnerDocument(): Document;
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the user
     * projection and returns the corresponding pixel.
     */
    getPixelFromCoordinate(coordinate: Coordinate): Pixel;
    /**
     * Get the pixel for a coordinate.  This takes a coordinate in the map view
     * projection and returns the corresponding pixel.
     */
    getPixelFromCoordinateInternal(coordinate: Coordinate): Pixel;
    /**
     * Get the map renderer.
     */
    getRenderer(): MapRenderer | null;
    /**
     * Get the size of this map.
     */
    getSize(): Size | undefined;
    /**
     * Get the target in which this map is rendered.
     * Note that this returns what is entered as an option or in setTarget:
     * if that was an element, it returns an element; if a string, it returns that.
     */
    getTarget(): HTMLElement | string | undefined;
    /**
     * Get the DOM element into which this map is rendered. In contrast to
     * getTarget this method always return an Element, or null if the
     * map has no target.
     */
    getTargetElement(): HTMLElement;
    getTilePriority(tile: Tile, tileSourceKey: string, tileCenter: Coordinate, tileResolution: number): number;
    /**
     * Get the view associated with this map. A view manages properties such as
     * center and resolution.
     */
    getView(): View;
    /**
     * Get the element that serves as the map viewport.
     */
    getViewport(): HTMLElement;
    handleBrowserEvent(browserEvent: UIEvent, type?: string): void;
    handleMapBrowserEvent(mapBrowserEvent: MapBrowserEvent<UIEvent>): void;
    /**
     * Detect if features intersect a pixel on the viewport. Layers included in the
     * detection can be configured through the layerFilter option.
     */
    hasFeatureAtPixel(pixel: Pixel, options?: AtPixelOptions): boolean;
    isRendered(): boolean;
    /**
     * Redraws all text after new fonts have loaded
     */
    redrawText(): void;
    /**
     * Remove the given control from the map.
     */
    removeControl(control: Control): Control | undefined;
    /**
     * Remove the given interaction from the map.
     */
    removeInteraction(interaction: Interaction): Interaction | undefined;
    /**
     * Removes the given layer from the map.
     */
    removeLayer(layer: BaseLayer): BaseLayer | undefined;
    /**
     * Remove the given overlay from the map.
     */
    removeOverlay(overlay: Overlay): Overlay | undefined;
    /**
     * Request a map rendering (at the next animation frame).
     */
    render(): void;
    /**
     * Requests an immediate render in a synchronous manner.
     */
    renderSync(): void;
    /**
     * Sets the layergroup of this map.
     */
    setLayerGroup(layerGroup: LayerGroup): void;
    /**
     * Clear any existing layers and add layers to the map.
     */
    setLayers(layers: BaseLayer[] | Collection<BaseLayer>): void;
    /**
     * Set the size of this map.
     */
    setSize(size: Size | undefined): void;
    /**
     * Set the target element to render this map into.
     */
    setTarget(target?: HTMLElement | string): void;
    /**
     * Set the view for this map.
     */
    setView(view: View | Promise<ViewOptions>): void;
    /**
     * Force a recalculation of the map viewport size.  This should be called when
     * third-party code changes the size of the map viewport.
     */
    updateSize(): void;
    on(type: TMapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TMapBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TMapBaseEventTypes | TMapBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TMapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TMapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TMapObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TMapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(type: TMapObjectEventTypes | TMapObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): void;
    on(type: TMapMapBrowserEventTypes, listener: ListenerFunction<MapBrowserEvent<UIEvent>>): EventsKey;
    on(type: TMapMapBrowserEventTypes[], listener: ListenerFunction<MapBrowserEvent<UIEvent>>): EventsKey[];
    once(type: TMapMapBrowserEventTypes, listener: ListenerFunction<MapBrowserEvent<UIEvent>>): EventsKey;
    once(type: TMapMapBrowserEventTypes[], listener: ListenerFunction<MapBrowserEvent<UIEvent>>): EventsKey[];
    un(
        type: TMapMapBrowserEventTypes | TMapMapBrowserEventTypes[],
        listener: ListenerFunction<MapBrowserEvent<UIEvent>>,
    ): void;
    on(type: TMapMapEventTypes, listener: ListenerFunction<MapEvent>): EventsKey;
    on(type: TMapMapEventTypes[], listener: ListenerFunction<MapEvent>): EventsKey[];
    once(type: TMapMapEventTypes, listener: ListenerFunction<MapEvent>): EventsKey;
    once(type: TMapMapEventTypes[], listener: ListenerFunction<MapEvent>): EventsKey[];
    un(type: TMapMapEventTypes | TMapMapEventTypes[], listener: ListenerFunction<MapEvent>): void;
    on(type: TMapRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TMapRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TMapRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TMapRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(type: TMapRenderEventTypes | TMapRenderEventTypes[], listener: ListenerFunction<RenderEvent>): void;
}
