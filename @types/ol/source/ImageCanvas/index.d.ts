declare module 'ol/source/ImageCanvas' {

  import ImageCanvas from 'ol/ImageCanvas';
  import { Extent } from 'ol/extent';
  import { Size } from 'ol/size';
  import Projection from 'ol/proj/Projection';
  import ImageSource from 'ol/source/Image';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';
  import { ObjectEvent } from 'ol/Object';
  import { AttributionLike } from 'ol/source/Source';
  import { ProjectionLike } from 'ol/proj';
  import State from 'ol/source/State';

  export type FunctionType = ((this: ImageCanvas, param1: Extent, param2: number, param3: number, param4: Size, param5: Projection) => HTMLCanvasElement);

  export default class ImageCanvasSource extends ImageSource {
    constructor(opt_options?: Options);
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
  }

  export interface Options {
    attributions?: AttributionLike;
    canvasFunction?: FunctionType;
    projection?: ProjectionLike;
    ratio?: number;
    resolutions?: number[];
    state?: State;
  }

}
