declare module 'ol/renderer/canvas/Map' {

  import MapRenderer from 'ol/renderer/Map';
  import PluggableMap from 'ol/PluggableMap';
  import { FrameState } from 'ol/PluggableMap';
  import { Transform } from 'ol/transform';
  import EventType from 'ol/render/EventType';

  export default class CanvasMapRenderer extends MapRenderer {
    constructor(map: PluggableMap);
    protected getTransform(frameState: FrameState): Transform;
    dispatchRenderEvent(type: EventType, frameState: FrameState): void;
  }

}
