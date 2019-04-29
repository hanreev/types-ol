declare module 'ol/featureloader' {

  import FeatureFormat from 'ol/format/Feature';
  import VectorSource from 'ol/source/Vector';
  import VectorTile from 'ol/VectorTile';
  import { Extent } from 'ol/extent';
  import Projection from 'ol/proj/Projection';

  export function loadFeaturesXhr(url: string | FeatureUrlFunction, format: FeatureFormat, success: (() => void) | (() => void), failure: ((this: VectorSource) => void) | (() => void)): FeatureLoader;

  export function xhr(url: string | FeatureUrlFunction, format: FeatureFormat): FeatureLoader;

  export type FeatureLoader = ((this: VectorSource | VectorTile, param1: Extent, param2: number, param3: Projection) => void);

  export type FeatureUrlFunction = ((param0: Extent, param1: number, param2: Projection) => string);

}
