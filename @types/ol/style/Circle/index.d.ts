declare module 'ol/style/Circle' {

  import RegularShape from 'ol/style/RegularShape';
  import Fill from 'ol/style/Fill';
  import Stroke from 'ol/style/Stroke';
  import AtlasManager from 'ol/style/AtlasManager';

  export default class CircleStyle extends RegularShape {
    constructor(opt_options?: Options);
    setRadius(radius: number): void;
  }

  export interface Options {
    fill?: Fill;
    radius: number;
    stroke?: Stroke;
    atlasManager?: AtlasManager;
  }

}
