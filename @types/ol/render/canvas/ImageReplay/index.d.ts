declare module 'ol/render/canvas/ImageReplay' {

  import CanvasReplay from 'ol/render/canvas/Replay';
  import { Extent } from 'ol/extent';

  export default class CanvasImageReplay extends CanvasReplay {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number, overlaps: boolean, declutterTree: any);
  }

}
