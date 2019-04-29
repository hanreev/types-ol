declare module 'ol/MapBrowserEvent' {

  import MapEvent from 'ol/MapEvent';
  import PluggableMap from 'ol/PluggableMap';
  import { FrameState } from 'ol/PluggableMap';
  import { Coordinate } from 'ol/coordinate';
  import { Pixel } from 'ol/pixel';

  export default class MapBrowserEvent extends MapEvent {
    constructor(type: string, map: PluggableMap, browserEvent: Event, opt_dragging?: boolean, opt_frameState?: FrameState);
    coordinate: Coordinate;
    dragging: boolean;
    pixel: Pixel;
    originalEvent: Event;
  }

}
