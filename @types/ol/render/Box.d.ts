import Disposable from 'ol/Disposable';
import PluggableMap from 'ol/PluggableMap';
import Polygon from 'ol/geom/Polygon';
import { Pixel } from 'ol/pixel';

export default class RenderBox extends Disposable {
    constructor(className: string);
    /**
     * Creates or updates the cached geometry.
     */
    createOrUpdateGeometry(): void;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    getGeometry(): Polygon;
    setMap(map: PluggableMap): void;
    setPixels(startPixel: Pixel, endPixel: Pixel): void;
}
