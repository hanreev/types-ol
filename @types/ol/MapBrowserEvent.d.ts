import Map, { FrameState } from './Map';
import MapEvent from './MapEvent';
import { Coordinate } from './coordinate';
import { Pixel } from './pixel';

export default class MapBrowserEvent<EVENT extends UIEvent = UIEvent> extends MapEvent {
    constructor(
        type: string,
        map: Map,
        originalEvent: EVENT,
        dragging?: boolean,
        frameState?: FrameState,
        activePointers?: PointerEvent[],
    );
    /**
     * The coordinate corresponding to the original browser event.  This will be in the user
     * projection if one is set.  Otherwise it will be in the view projection.
     */
    coordinate: Coordinate;
    /**
     * Indicates if the map is currently being dragged. Only set for
     * POINTERDRAG and POINTERMOVE events. Default is false.
     */
    dragging: boolean;
    /**
     * The map pixel relative to the viewport corresponding to the original event.
     */
    pixel: Pixel;
    /**
     * Prevents the default browser action.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.preventDefault.
     */
    preventDefault(): void;
    /**
     * Prevents further propagation of the current event.
     * See https://developer.mozilla.org/en-US/docs/Web/API/event.stopPropagation.
     */
    stopPropagation(): void;
    /**
     * The original browser event.
     */
    originalEvent: EVENT;
}
