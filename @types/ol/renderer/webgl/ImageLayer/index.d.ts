declare module 'ol/renderer/webgl/ImageLayer' {

  import WebGLLayerRenderer from 'ol/renderer/webgl/Layer';
  import WebGLMapRenderer from 'ol/renderer/webgl/Map';
  import ImageLayer from 'ol/layer/Image';
  import MapRenderer from 'ol/renderer/Map';
  import Layer from 'ol/layer/Layer';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';

  export default class WebGLImageLayerRenderer extends WebGLLayerRenderer {
    constructor(mapRenderer: WebGLMapRenderer, imageLayer: ImageLayer);
    create(mapRenderer: MapRenderer, layer: Layer): WebGLImageLayerRenderer;
    handles(layer: Layer): boolean;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
  }

}
