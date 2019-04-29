declare module 'ol/renderer/vector' {

  import { FeatureLike } from 'ol/Feature';
  import ReplayGroup from 'ol/render/ReplayGroup';
  import Style from 'ol/style/Style';
  import Event from 'ol/events/Event';
  import Circle from 'ol/geom/Circle';
  import Feature from 'ol/Feature';
  import Geometry from 'ol/geom/Geometry';
  import RenderFeature from 'ol/render/Feature';
  import GeometryCollection from 'ol/geom/GeometryCollection';
  import LineString from 'ol/geom/LineString';
  import MultiLineString from 'ol/geom/MultiLineString';
  import MultiPoint from 'ol/geom/MultiPoint';
  import MultiPolygon from 'ol/geom/MultiPolygon';
  import Point from 'ol/geom/Point';
  import Polygon from 'ol/geom/Polygon';

  export function defaultOrder(feature1: FeatureLike, feature2: FeatureLike): number;

  export function getSquaredTolerance(resolution: number, pixelRatio: number): number;

  export function getTolerance(resolution: number, pixelRatio: number): number;

  export function renderFeature<T>(replayGroup: ReplayGroup, feature: FeatureLike, style: Style, squaredTolerance: number, listener: ((this: T, param1: Event) => void), thisArg: T): boolean;

}
