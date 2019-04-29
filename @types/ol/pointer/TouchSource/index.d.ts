declare module 'ol/pointer/TouchSource' {

  import EventSource from 'ol/pointer/EventSource';
  import PointerEventHandler from 'ol/pointer/PointerEventHandler';
  import MouseSource from 'ol/pointer/MouseSource';

  export default class TouchSource extends EventSource {
    constructor(dispatcher: PointerEventHandler, mouseSource: MouseSource);
  }

}
