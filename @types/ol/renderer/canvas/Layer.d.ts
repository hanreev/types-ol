import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
import { Extent } from '../../extent';
import Layer from '../../layer/Layer';
import { Pixel } from '../../pixel';
import { FrameState } from '../../PluggableMap';
import { Transform } from '../../transform';
import LayerRenderer from '../Layer';

export default class CanvasLayerRenderer<LayerType extends Layer<SourceType>> extends LayerRenderer<LayerType> {
    constructor(layer: LayerType);
    protected container: HTMLElement;
    protected context: CanvasRenderingContext2D;
    protected inversePixelTransform: Transform;
    protected pixelTransform: Transform;
    protected renderedResolution: number;
    protected clip(context: CanvasRenderingContext2D, frameState: FrameState, extent: Extent): void;
    protected clipUnrotated(context: CanvasRenderingContext2D, frameState: FrameState, extent: Extent): void;
    protected getRenderTransform(frameState: FrameState, width: number, height: number, offsetX: number): Transform;
    protected postRender(context: CanvasRenderingContext2D, frameState: FrameState): void;
    protected preRender(context: CanvasRenderingContext2D, frameState: FrameState): void;
    getDataAtPixel(pixel: Pixel, frameState: FrameState, hitTolerance: number): Uint8ClampedArray | Uint8Array;
    useContainer(target: HTMLElement, transform: Transform, opacity: number): void;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
}
