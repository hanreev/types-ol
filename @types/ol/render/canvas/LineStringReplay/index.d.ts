declare module 'ol/render/canvas/LineStringReplay' {

  import CanvasReplay from 'ol/render/canvas/Replay';
  import { Extent } from 'ol/extent';
  import { FillStrokeState } from 'ol/render/canvas';

  export default class CanvasLineStringReplay extends CanvasReplay {
    constructor(tolerance: number, maxExtent: Extent, resolution: number, pixelRatio: number, overlaps: boolean, declutterTree: any);
    applyStroke(): void;
    applyStroke(state: FillStrokeState): void;
  }

}
