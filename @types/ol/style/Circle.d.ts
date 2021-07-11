import { Size } from 'ol/size';
import Fill from 'ol/style/Fill';
import RegularShape from 'ol/style/RegularShape';
import Stroke from 'ol/style/Stroke';

export interface Options {
    fill?: Fill;
    radius: number;
    stroke?: Stroke;
    displacement?: number[];
    scale?: number | Size;
    rotation?: number;
    rotateWithView?: boolean;
}
export default class CircleStyle extends RegularShape {
    constructor(opt_options?: Options);
    /**
     * Clones the style.
     */
    clone(): CircleStyle;
    /**
     * Set the circle radius.
     */
    setRadius(radius: number): void;
}
