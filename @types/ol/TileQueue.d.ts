import { FrameState } from './Map';
import Tile from './Tile';
import { Coordinate } from './coordinate';
import BaseEvent from './events/Event';
import PriorityQueue from './structs/PriorityQueue';

export type PriorityFunction = (p0: Tile, p1: string, p2: Coordinate, p3: number) => number;
export default class TileQueue extends PriorityQueue<any> {
    constructor(tilePriorityFunction: PriorityFunction, tileChangeCallback: () => any);
    protected handleTileChange(event: BaseEvent): void;
    enqueue(element: any[]): boolean;
    getTilesLoading(): number;
    loadMoreTiles(maxTotalLoading: number, maxNewLoads: number): void;
}
export function getTilePriority(
    frameState: FrameState,
    tile: Tile,
    tileSourceKey: string,
    tileCenter: Coordinate,
    tileResolution: number,
): number;
