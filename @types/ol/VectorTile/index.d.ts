declare module 'ol/VectorTile' {

  import Tile from 'ol/Tile';
  import { TileCoord } from 'ol/tilecoord';
  import TileState from 'ol/TileState';
  import FeatureFormat from 'ol/format/Feature';
  import { LoadFunction } from 'ol/Tile';
  import { Options } from 'ol/Tile';
  import { Extent } from 'ol/extent';
  import { FeatureLike } from 'ol/Feature';
  import Projection from 'ol/proj/Projection';
  import Layer from 'ol/layer/Layer';
  import ReplayGroup from 'ol/render/ReplayGroup';
  import Feature from 'ol/Feature';
  import { FeatureLoader } from 'ol/featureloader';

  export default class VectorTile extends Tile {
    constructor(tileCoord: TileCoord, state: TileState, src: string, format: FeatureFormat, tileLoadFunction: LoadFunction, opt_options?: Options);
    getExtent(): Extent;
    getFeatures(): FeatureLike[];
    getFormat(): FeatureFormat;
    getProjection(): Projection;
    getReplayGroup(layer: Layer, key: string): ReplayGroup;
    onError(): void;
    onLoad(features: Feature[], dataProjection: Projection, extent: Extent): void;
    setExtent(extent: Extent): void;
    setFeatures(features: Feature[]): void;
    setLoader(loader: FeatureLoader): void;
    setProjection(projection: Projection): void;
    setReplayGroup(layer: Layer, key: string, replayGroup: ReplayGroup): void;
  }

}
