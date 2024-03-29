import Feature from './Feature';
import VectorTile from './VectorTile';
import { Extent } from './extent';
import FeatureFormat from './format/Feature';
import Geometry from './geom/Geometry';
import Projection from './proj/Projection';
import VectorSource from './source/Vector';

/**
 * {@link module:ol/source/Vector~VectorSource} sources use a function of this type to
 * load features.
 * This function takes up to 5 arguments. These are an {@link module:ol/extent~Extent} representing
 * the area to be loaded, a {number} representing the resolution (map units per pixel), an
 * {@link module:ol/proj/Projection~Projection} for the projection, an optional success callback that should get
 * the loaded features passed as an argument and an optional failure callback with no arguments. If
 * the callbacks are not used, the corresponding vector source will not fire 'featuresloadend' and
 * 'featuresloaderror' events. this within the function is bound to the
 * {@link module:ol/source/Vector~VectorSource} it's called from.
 * The function is responsible for loading the features and adding them to the
 * source.
 */
export type FeatureLoader = (
    this: VectorSource<Geometry> | VectorTile,
    p0: Extent,
    p1: number,
    p2: Projection,
    p3: (p0: Feature<Geometry>[]) => void,
    p4: () => void,
) => void;
/**
 * {@link module:ol/source/Vector~VectorSource} sources use a function of this type to
 * get the url to load features from.
 * This function takes an {@link module:ol/extent~Extent} representing the area
 * to be loaded, a {number} representing the resolution (map units per pixel)
 * and an {@link module:ol/proj/Projection~Projection} for the projection  as
 * arguments and returns a {string} representing the URL.
 */
export type FeatureUrlFunction = (p0: Extent, p1: number, p2: Projection) => string;
export function loadFeaturesXhr(
    url: string | FeatureUrlFunction,
    format: FeatureFormat,
    extent: Extent,
    resolution: number,
    projection: Projection,
    success: (p0: Feature<Geometry>[], p1: Projection) => void,
    failure: () => void,
): void;
/**
 * Setter for the withCredentials configuration for the XHR.
 */
export function setWithCredentials(xhrWithCredentials: boolean): void;
/**
 * Create an XHR feature loader for a url and format. The feature loader
 * loads features (with XHR), parses the features, and adds them to the
 * vector source.
 */
export function xhr(url: string | FeatureUrlFunction, format: FeatureFormat): FeatureLoader;
