import Collection from '../Collection';
import { Options } from './Attribution';
import Control from './Control';
import { Options as Options_1 } from './Rotate';
import { Options as Options_2 } from './Zoom';

export interface DefaultsOptions {
    attribution?: boolean | undefined;
    attributionOptions?: Options | undefined;
    rotate?: boolean | undefined;
    rotateOptions?: Options_1 | undefined;
    zoom?: boolean | undefined;
    zoomOptions?: Options_2 | undefined;
}
/**
 * Set of controls included in maps by default. Unless configured otherwise,
 * this returns a collection containing an instance of each of the following
 * controls:
 *
 * {@link module:ol/control/Zoom~Zoom}
 * {@link module:ol/control/Rotate~Rotate}
 * {@link module:ol/control/Attribution~Attribution}
 *
 */
export function defaults(options?: DefaultsOptions): Collection<Control>;
