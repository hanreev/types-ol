import ImageTile from 'ol/ImageTile';
import { FrameState } from 'ol/PluggableMap';
import Tile from 'ol/Tile';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import Projection from 'ol/proj/Projection';
import { HitMatch } from 'ol/renderer/Map';
import CanvasLayerRenderer from 'ol/renderer/canvas/Layer';
import { FeatureCallback } from 'ol/renderer/vector';
import TileSource from 'ol/source/Tile';
import TileGrid from 'ol/tilegrid/TileGrid';

export default class CanvasTileLayerRenderer extends CanvasLayerRenderer {
    constructor(tileLayer: TileLayer<TileSource> | VectorTileLayer);
    protected renderedPixelRatio: number;
    protected renderedProjection: Projection;
    protected renderedRevision: number;
    protected renderedTiles: Tile[];
    protected tmpExtent: Extent;
    /**
     * Get the image from a tile.
     */
    protected getTileImage(tile: ImageTile): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    protected isDrawableTile(tile: Tile): boolean;
    /**
     * Manage tile pyramid.
     * This function performs a number of functions related to the tiles at the
     * current zoom and lower zoom levels:
     *
     * registers idle tiles in frameState.wantedTiles so that they are not
     * discarded by the tile queue
     * enqueues missing tiles
     *
     */
    protected manageTilePyramid(
        frameState: FrameState,
        tileSource: TileSource,
        tileGrid: TileGrid,
        pixelRatio: number,
        projection: Projection,
        extent: Extent,
        currentZ: number,
        preload: number,
        opt_tileCallback?: () => void,
    ): void;
    protected scheduleExpireCache(frameState: FrameState, tileSource: TileSource): void;
    protected updateUsedTiles(
        usedTiles: { [key: string]: { [key: string]: boolean } },
        tileSource: TileSource,
        tile: Tile,
    ): void;
    drawTileImage(
        tile: ImageTile,
        frameState: FrameState,
        x: number,
        y: number,
        w: number,
        h: number,
        gutter: number,
        transition: boolean,
        opacity: number,
    ): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getImage(): HTMLCanvasElement;
    getLayer(): TileLayer<TileSource> | VectorTileLayer;
    getTile(z: number, x: number, y: number, frameState: FrameState): Tile;
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
