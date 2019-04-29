declare module 'ol/render/webgl/Immediate' {

  import VectorContext from 'ol/render/VectorContext';
  import WebGLContext from 'ol/webgl/Context';
  import { Coordinate } from 'ol/coordinate';
  import { Size } from 'ol/size';
  import { Extent } from 'ol/extent';

  export default class WebGLImmediateRenderer extends VectorContext {
    constructor(context: WebGLContext, center: Coordinate, resolution: number, rotation: number, size: Size, extent: Extent, pixelRatio: number);
  }

}
