import { FrameState } from 'ol/PluggableMap';
import Tile from 'ol/Tile';
import { Coordinate } from 'ol/coordinate';
import BaseEvent from 'ol/events/Event';
import PriorityQueue from 'ol/structs/PriorityQueue';

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
