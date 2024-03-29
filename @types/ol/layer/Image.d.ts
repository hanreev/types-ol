import { ObjectEvent } from '../Object';
import { EventsKey, ListenerFunction } from '../events';
import BaseEvent from '../events/Event';
import { Pixel } from '../pixel';
import RenderEvent from '../render/Event';
import CanvasImageLayerRenderer from '../renderer/canvas/ImageLayer';
import ImageSource from '../source/Image';
import BaseImageLayer, { Options } from './BaseImage';

export type TImageLayerBaseEventTypes = 'change' | 'error' | 'sourceready';
export type TImageLayerObjectEventTypes =
    | 'change:extent'
    | 'change:maxResolution'
    | 'change:maxZoom'
    | 'change:minResolution'
    | 'change:minZoom'
    | 'change:opacity'
    | 'change:source'
    | 'change:visible'
    | 'change:zIndex'
    | 'propertychange';
export type TImageLayerRenderEventTypes = 'postrender' | 'prerender';
export default class ImageLayer<ImageSourceType extends ImageSource = ImageSource> extends BaseImageLayer<
    ImageSourceType,
    CanvasImageLayerRenderer
> {
    constructor(options?: Options<ImageSourceType>);
    /**
     * Get data for a pixel location.  A four element RGBA array will be returned.  For requests outside the
     * layer extent, null will be returned.  Data for an image can only be retrieved if the
     * source's crossOrigin property is set.
     * <code>// display layer data on every pointer move
     * map.on('pointermove', (event) => {
     *   console.log(layer.getData(event.pixel));
     * });</code>
     */
    getData(pixel: Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView | null;
    on(type: TImageLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TImageLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TImageLayerBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TImageLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(type: TImageLayerBaseEventTypes | TImageLayerBaseEventTypes[], listener: ListenerFunction<BaseEvent>): void;
    on(type: TImageLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    on(type: TImageLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    once(type: TImageLayerObjectEventTypes, listener: ListenerFunction<ObjectEvent>): EventsKey;
    once(type: TImageLayerObjectEventTypes[], listener: ListenerFunction<ObjectEvent>): EventsKey[];
    un(
        type: TImageLayerObjectEventTypes | TImageLayerObjectEventTypes[],
        listener: ListenerFunction<ObjectEvent>,
    ): void;
    on(type: TImageLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    on(type: TImageLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    once(type: TImageLayerRenderEventTypes, listener: ListenerFunction<RenderEvent>): EventsKey;
    once(type: TImageLayerRenderEventTypes[], listener: ListenerFunction<RenderEvent>): EventsKey[];
    un(
        type: TImageLayerRenderEventTypes | TImageLayerRenderEventTypes[],
        listener: ListenerFunction<RenderEvent>,
    ): void;
}
