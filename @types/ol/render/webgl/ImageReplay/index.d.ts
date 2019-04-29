declare module 'ol/render/webgl/ImageReplay' {

  import WebGLTextureReplay from 'ol/render/webgl/TextureReplay';
  import { Extent } from 'ol/extent';

  export default class WebGLImageReplay extends WebGLTextureReplay {
    constructor(tolerance: number, maxExtent: Extent);
    protected hitDetectionImages_: any[];
    protected images_: any[];
  }

}
