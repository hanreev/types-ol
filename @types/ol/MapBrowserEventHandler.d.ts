import Map from './Map';
import Target from './events/Target';

export default class MapBrowserEventHandler extends Target {
    constructor(map: Map, moveTolerance?: number);
    /**
     * Clean up.
     */
    disposeInternal(): void;
}
