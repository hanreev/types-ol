declare module 'ol/render/webgl/TextReplay' {

  import AtlasManager from 'ol/style/AtlasManager';
  import WebGLTextureReplay from 'ol/render/webgl/TextureReplay';
  import { Extent } from 'ol/extent';

  export interface GlyphAtlas {
    atlas: AtlasManager;
    width: { [key: string]: number };
    height: number;
  }

  export default class WebGLTextReplay extends WebGLTextureReplay {
    constructor(tolerance: number, maxExtent: Extent);
  }

}
