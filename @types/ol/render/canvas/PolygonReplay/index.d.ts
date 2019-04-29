declare module 'ol/render/canvas/PolygonReplay' {

  import CanvasReplay from 'ol/render/canvas/Replay';
  import { Extent } from 'ol/extent';

  export default class CanvasPolygonReplay extends CanvasReplay {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number, overlaps: boolean, declutterTree: any);
  }

}
