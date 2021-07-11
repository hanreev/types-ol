import Feature from '../Feature';
import ImageBase from '../ImageBase';
import Observable from '../Observable';
import { FrameState } from '../PluggableMap';
import Tile from '../Tile';
import TileRange from '../TileRange';
import { Coordinate } from '../coordinate';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import Geometry from '../geom/Geometry';
import Layer from '../layer/Layer';
import { Pixel } from '../pixel';
import Projection from '../proj/Projection';
import TileSource from '../source/Tile';
import { HitMatch } from './Map';
import { FeatureCallback } from './vector';

export default class LayerRenderer<LayerType extends Layer = Layer> extends Observable {
    constructor(layer: LayerType);
    protected layer_: LayerType;
    /**
     * Create a function that adds loaded tiles to the tile lookup.
     */
    protected createLoadedTileFinder(
        source: TileSource,
        projection: Projection,
        tiles: { [key: number]: { [key: string]: Tile } },
    ): (p0: number, p1: TileRange) => boolean;
    /**
     * Load the image if not already loaded, and register the image change
     * listener if needed.
     */
    protected loadImage(image: ImageBase): boolean;
    protected renderIfReadyAndVisible(): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getDataAtPixel(pixel: Pixel, frameState: FrameState, hitTolerance: number): Uint8ClampedArray | Uint8Array;
    /**
     * Asynchronous layer level hit detection.
     */
    getFeatures(pixel: Pixel): Promise<Feature<Geometry>[]>;
    getLayer(): LayerType;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    loadedTileCallback(tiles: { [key: number]: { [key: string]: Tile } }, zoom: number, tile: Tile): boolean | void;
    /**
     * Determine whether render should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement;
    on(type: string, listener: ListenerFunction): EventsKey;
    on(type: string[], listener: ListenerFunction): EventsKey[];
    once(type: string, listener: ListenerFunction): EventsKey;
    once(type: string[], listener: ListenerFunction): EventsKey[];
    un(type: string | string[], listener: ListenerFunction): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
}
