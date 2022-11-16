import Disposable from '../Disposable';
import Map from '../Map';
import Polygon from '../geom/Polygon';
import { Pixel } from '../pixel';

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
    setMap(map: Map | null): void;
    setPixels(startPixel: Pixel, endPixel: Pixel): void;
}
