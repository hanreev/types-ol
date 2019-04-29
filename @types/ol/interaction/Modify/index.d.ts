declare module 'ol/interaction/Modify' {

  import Event from 'ol/events/Event';
  import Collection from 'ol/Collection';
  import Feature from 'ol/Feature';
  import MapBrowserEvent from 'ol/MapBrowserEvent';
  import { Coordinate } from 'ol/coordinate';
  import { StyleFunction } from 'ol/style/Style';
  import PointerInteraction from 'ol/interaction/Pointer';
  import VectorLayer from 'ol/layer/Vector';
  import { EventsKey } from 'ol/events';
  import { ObjectEvent } from 'ol/Object';
  import { Condition } from 'ol/events/condition';
  import { StyleLike } from 'ol/style/Style';
  import VectorSource from 'ol/source/Vector';
  import SimpleGeometry from 'ol/geom/SimpleGeometry';
  import { Extent } from 'ol/extent';

  export class ModifyEvent extends Event {
    constructor();
    features: Collection<Feature>;
    mapBrowserEvent: MapBrowserEvent;
  }

  export default class Modify extends PointerInteraction {
    constructor(options: Options);
    getOverlay(): VectorLayer;
    removePoint(): boolean;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifyend', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifyend', listener: (evt: ModifyEvent) => void): void;
    on(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    once(type: 'modifystart', listener: (evt: ModifyEvent) => void): EventsKey;
    un(type: 'modifystart', listener: (evt: ModifyEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
  }

  export interface Options {
    condition?: Condition;
    deleteCondition?: Condition;
    insertVertexCondition?: Condition;
    pixelTolerance?: number;
    style?: StyleLike;
    source?: VectorSource;
    features?: Collection<Feature>;
    wrapX?: boolean;
  }

  export interface SegmentData {
    depth?: number[];
    feature: Feature;
    geometry: SimpleGeometry;
    index?: number;
    segment: Extent[];
    featureSegments?: SegmentData[];
  }

}
