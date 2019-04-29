declare module 'ol/pointer/MouseSource' {

  import PointerEventHandler from 'ol/pointer/PointerEventHandler';
  import EventSource from 'ol/pointer/EventSource';

  export function prepareEvent(inEvent: Event, dispatcher: PointerEventHandler): any;

  export default class MouseSource extends EventSource {
    constructor(dispatcher: PointerEventHandler);
    cancel(inEvent: Event): void;
    cleanupMouse(): void;
  }

}
