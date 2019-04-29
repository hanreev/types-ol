declare module 'ol/reproj/Image' {

  import ImageBase from 'ol/ImageBase';
  import Projection from 'ol/proj/Projection';
  import { Extent } from 'ol/extent';

  export type FunctionType = (() => void);

  export default class ReprojImage extends ImageBase {
    constructor(sourceProj: Projection, targetProj: Projection, targetExtent: Extent, targetResolution: number, pixelRatio: number, getImageFunction: FunctionType);
    getProjection(): Projection;
  }

}
