import Layer from './layer/Layer';
import { OrderFunction } from './render';
import Tile from './Tile';
import { TileCoord } from './tilecoord';
import TileGrid from './tilegrid/TileGrid';
import TileState from './TileState';
import VectorTile from './VectorTile';

export interface ReplayState {
    dirty: boolean;
    renderedRenderOrder: OrderFunction;
    renderedTileRevision: number;
    renderedResolution: number;
    renderedRevision: number;
    renderedZ: number;
    renderedTileResolution: number;
    renderedTileZ: number;
}
export default class VectorRenderTile extends Tile {
    constructor(
        tileCoord: TileCoord,
        state: TileState,
        urlTileCoord: TileCoord,
        sourceTileGrid: TileGrid,
        getSourceTiles: (p0: VectorRenderTile) => VectorTile[],
        removeSourceTiles: (p0: VectorRenderTile) => void
    );
    getContext(layer: Layer): CanvasRenderingContext2D;
    getImage(layer: Layer): HTMLCanvasElement;
    getReplayState(layer: Layer): ReplayState;
    hasContext(layer: Layer): boolean;
}
