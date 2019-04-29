declare module 'ol/render/webgl/ReplayGroup' {

  import ReplayGroup from 'ol/render/ReplayGroup';
  import { Extent } from 'ol/extent';
  import WebGLContext from 'ol/webgl/Context';
  import { Coordinate } from 'ol/coordinate';
  import { Size } from 'ol/size';
  import Feature from 'ol/Feature';
  import RenderFeature from 'ol/render/Feature';

  export default class WebGLReplayGroup extends ReplayGroup {
    constructor(tolerance: number, maxExtent: Extent, opt_renderBuffer?: number);
    finish(context: WebGLContext): void;
    forEachFeatureAtCoordinate<T>(coordinate: Coordinate, context: WebGLContext, center: Coordinate, resolution: number, rotation: number, size: Size, pixelRatio: number, opacity: number, skippedFeaturesHash: { [key: string]: boolean }, callback: ((param0: Feature | RenderFeature) => T)): T;
    getDeleteResourcesFunction(context: WebGLContext): (() => void);
    hasFeatureAtCoordinate(coordinate: Coordinate, context: WebGLContext, center: Coordinate, resolution: number, rotation: number, size: Size, pixelRatio: number, opacity: number, skippedFeaturesHash: { [key: string]: boolean }): boolean;
    replay(context: WebGLContext, center: Coordinate, resolution: number, rotation: number, size: Size, pixelRatio: number, opacity: number, skippedFeaturesHash: { [key: string]: boolean }): void;
  }

}
