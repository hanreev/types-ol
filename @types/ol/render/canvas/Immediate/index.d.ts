declare module 'ol/render/canvas/Immediate' {

  import VectorContext from 'ol/render/VectorContext';
  import { Extent } from 'ol/extent';
  import { Transform } from 'ol/transform';

  export default class CanvasImmediateRenderer extends VectorContext {
    constructor(context: CanvasRenderingContext2D, pixelRatio: number, extent: Extent, transform: Transform, viewRotation: number);
  }

}
