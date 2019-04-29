declare module 'ol/render/webgl/CircleReplay' {

  import WebGLReplay from 'ol/render/webgl/Replay';
  import { Extent } from 'ol/extent';

  export default class WebGLCircleReplay extends WebGLReplay {
    constructor(tolerance: number, maxExtent: Extent);
  }

}
