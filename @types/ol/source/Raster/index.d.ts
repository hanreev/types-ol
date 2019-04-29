declare module 'ol/source/Raster' {

  import ImageSource from 'ol/source/Image';
  import CanvasLayerRenderer from 'ol/renderer/canvas/Layer';
  import Source from 'ol/source/Source';
  import Layer from 'ol/layer/Layer';
  import TileSource from 'ol/source/Tile';
  import { FrameState } from 'ol/PluggableMap';
  import { State } from 'ol/layer/Layer';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';
  import { ObjectEvent } from 'ol/Object';
  import { Extent } from 'ol/extent';

  export type Operation = ((param0: number[][] | ImageData[], param1: any) => number[] | ImageData);

  export interface Options {
    sources: any[];
    operation?: Operation;
    lib?: any;
    threads?: number;
    operationType?: 'pixel' | 'image';
  }

  export default class RasterSource extends ImageSource {
    constructor(options: Options);
    setOperation(operation: Operation, opt_lib?: any): void;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'afteroperations', listener: (evt: RasterSourceEvent) => void): EventsKey;
    once(type: 'afteroperations', listener: (evt: RasterSourceEvent) => void): EventsKey;
    un(type: 'afteroperations', listener: (evt: RasterSourceEvent) => void): void;
    on(type: 'beforeoperations', listener: (evt: RasterSourceEvent) => void): EventsKey;
    once(type: 'beforeoperations', listener: (evt: RasterSourceEvent) => void): EventsKey;
    un(type: 'beforeoperations', listener: (evt: RasterSourceEvent) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
  }

  export class RasterSourceEvent extends Event {
    constructor(type: string, frameState: FrameState, data: any);
    data: any;
    extent: Extent;
    resolution: number;
  }

}
