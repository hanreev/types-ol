import { EventsKey, ListenerFunction } from './events';
import BaseEvent from './events/Event';
import LRUCache from './structs/LRUCache';

export default class TileCache extends LRUCache<any> {
    constructor();
    expireCache(usedTiles: { [key: string]: boolean }): void;
    /**
     * Prune all tiles from the cache that don't have the same z as the newest tile.
     */
    pruneExceptNewestZ(): void;
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
