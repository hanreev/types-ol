declare module 'ol/ImageCanvas' {

  import ImageBase from 'ol/ImageBase';
  import { Extent } from 'ol/extent';

  export default class ImageCanvas extends ImageBase {
    constructor(extent: Extent, resolution: number, pixelRatio: number, canvas: HTMLCanvasElement, opt_loader?: Loader);
    getError(): Error;
    getImage(): HTMLCanvasElement;
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
  }

  export type Loader = ((param0: (() => void)) => void);

}
