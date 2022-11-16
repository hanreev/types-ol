import { Color } from '../color';
import { ColorLike } from '../colorlike';

export interface Options {
    color?: Color | ColorLike | null | undefined;
}
export default class Fill {
    constructor(options?: Options);
    /**
     * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
     */
    clone(): Fill;
    /**
     * Get the fill color.
     */
    getColor(): Color | ColorLike | null;
    /**
     * Set the color.
     */
    setColor(color: Color | ColorLike | null): void;
}
