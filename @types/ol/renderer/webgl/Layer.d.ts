import { FrameState } from '../../Map';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import Layer from '../../layer/Layer';
import WebGLHelper, { UniformValue } from '../../webgl/Helper';
import LayerRenderer from '../Layer';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';

export type TWebGLLayerRendererBaseEventTypes = 'change' | 'error';
export interface Options {
    uniforms?: Record<string, UniformValue> | undefined;
    postProcesses?: PostProcessesOptions[] | undefined;
}
export interface PostProcessesOptions {
    scaleRatio?: number | undefined;
    vertexShader?: string | undefined;
    fragmentShader?: string | undefined;
    uniforms?: Record<string, UniformValue> | undefined;
}
export default class WebGLLayerRenderer<LayerType extends Layer = Layer> extends LayerRenderer {
    constructor(layer: LayerType, options?: Options);
    protected helper: WebGLHelper;
    protected afterHelperCreated(): void;
    protected dispatchPostComposeEvent(context: WebGLRenderingContext, frameState: FrameState): void;
    protected dispatchPreComposeEvent(context: WebGLRenderingContext, frameState: FrameState): void;
    protected postRender(context: WebGLRenderingContext, frameState: FrameState): void;
    /**
     * Determine whether renderFrame should be called.
     */
    protected prepareFrameInternal(frameState: FrameState): boolean;
    protected preRender(context: WebGLRenderingContext, frameState: FrameState): void;
    protected removeHelper(): void;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    /**
     * Determine whether renderFrame should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement;
    /**
     * Reset options (only handles uniforms).
     */
    reset(options: Options): void;
    on(type: TWebGLLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLLayerRendererBaseEventTypes | TWebGLLayerRendererBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
}
