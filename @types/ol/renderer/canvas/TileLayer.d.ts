import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
import { Extent } from '../../extent';
import ImageTile from '../../ImageTile';
import TileLayer from '../../layer/Tile';
import VectorTileLayer from '../../layer/VectorTile';
import { FrameState } from '../../PluggableMap';
import Projection from '../../proj/Projection';
import TileSource from '../../source/Tile';
import Tile from '../../Tile';
import TileGrid from '../../tilegrid/TileGrid';
import CanvasLayerRenderer from './Layer';

export default class CanvasTileLayerRenderer extends CanvasLayerRenderer<LayerType> {
    constructor(tileLayer: TileLayer | VectorTileLayer);
    protected renderedRevision: number;
    protected renderedTiles: Tile[];
    protected tmpExtent: Extent;
    protected getTileImage(tile: ImageTile): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
    protected isDrawableTile(tile: Tile): boolean;
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
    getLayer(): TileLayer | VectorTileLayer;
    getLayer(): LayerType;
    getTile(z: number, x: number, y: number, frameState: FrameState): Tile;
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
