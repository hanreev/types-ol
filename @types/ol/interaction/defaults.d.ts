import Collection from '../Collection';
import Interaction from './Interaction';

export interface DefaultsOptions {
    altShiftDragRotate?: boolean | undefined;
    onFocusOnly?: boolean | undefined;
    doubleClickZoom?: boolean | undefined;
    keyboard?: boolean | undefined;
    mouseWheelZoom?: boolean | undefined;
    shiftDragZoom?: boolean | undefined;
    dragPan?: boolean | undefined;
    pinchRotate?: boolean | undefined;
    pinchZoom?: boolean | undefined;
    zoomDelta?: number | undefined;
    zoomDuration?: number | undefined;
}
/**
 * Set of interactions included in maps by default. Specific interactions can be
 * excluded by setting the appropriate option to false in the constructor
 * options, but the order of the interactions is fixed.  If you want to specify
 * a different order for interactions, you will need to create your own
 * {@link module:ol/interaction/Interaction~Interaction} instances and insert
 * them into a {@link module:ol/Collection~Collection} in the order you want
 * before creating your {@link module:ol/Map~Map} instance. Changing the order can
 * be of interest if the event propagation needs to be stopped at a point.
 * The default set of interactions, in sequence, is:
 *
 * {@link module:ol/interaction/DragRotate~DragRotate}
 * {@link module:ol/interaction/DoubleClickZoom~DoubleClickZoom}
 * {@link module:ol/interaction/DragPan~DragPan}
 * {@link module:ol/interaction/PinchRotate~PinchRotate}
 * {@link module:ol/interaction/PinchZoom~PinchZoom}
 * {@link module:ol/interaction/KeyboardPan~KeyboardPan}
 * {@link module:ol/interaction/KeyboardZoom~KeyboardZoom}
 * {@link module:ol/interaction/MouseWheelZoom~MouseWheelZoom}
 * {@link module:ol/interaction/DragZoom~DragZoom}
 *
 */
export function defaults(options?: DefaultsOptions): Collection<Interaction>;
