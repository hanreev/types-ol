declare module 'ol/reproj/Triangulation' {

  import { Coordinate } from 'ol/coordinate';
  import Projection from 'ol/proj/Projection';
  import { Extent } from 'ol/extent';

  export interface Triangle {
    source: Coordinate[];
    target: Coordinate[];
  }

  export default class Triangulation {
    constructor(sourceProj: Projection, targetProj: Projection, targetExtent: Extent, maxSourceExtent: Extent, errorThreshold: number);
    calculateSourceExtent(): Extent;
    getTriangles(): Triangle[];
  }

}
