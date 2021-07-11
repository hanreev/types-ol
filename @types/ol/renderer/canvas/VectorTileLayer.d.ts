import Feature from 'ol/Feature';
import { FeatureLike } from 'ol/Feature';
import { FrameState } from 'ol/PluggableMap';
import Tile from 'ol/Tile';
import VectorRenderTile from 'ol/VectorRenderTile';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import Geometry from 'ol/geom/Geometry';
import VectorTileLayer from 'ol/layer/VectorTile';
import { Pixel } from 'ol/pixel';
import Projection from 'ol/proj/Projection';
import BuilderGroup from 'ol/render/canvas/BuilderGroup';
import { HitMatch } from 'ol/renderer/Map';
import CanvasTileLayerRenderer from 'ol/renderer/canvas/TileLayer';
import { FeatureCallback } from 'ol/renderer/vector';
import Style from 'ol/style/Style';

export default class CanvasVectorTileLayerRenderer extends CanvasTileLayerRenderer {
    constructor(layer: VectorTileLayer);
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    /**
     * Asynchronous layer level hit detection.
     */
    getFeatures(pixel: Pixel): Promise<Feature<Geometry>[]>;
    getTile(z: number, x: number, y: number, frameState: FrameState): Tile;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    isDrawableTile(tile: VectorRenderTile): boolean;
    /**
     * Determine whether render should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
    prepareTile(
        tile: VectorRenderTile,
        pixelRatio: number,
        projection: Projection,
        queue: boolean,
    ): boolean | undefined;
    /**
     * Render declutter items for this layer
     */
    renderDeclutter(frameState: FrameState): void;
    renderFeature(
        feature: FeatureLike,
        squaredTolerance: number,
        styles: Style | Style[],
        builderGroup: BuilderGroup,
        opt_declutterBuilderGroup?: BuilderGroup,
    ): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement;
    renderQueuedTileImages_(hifi: boolean, frameState: FrameState): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
}
