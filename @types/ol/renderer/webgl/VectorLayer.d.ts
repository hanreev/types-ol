import Feature from '../../Feature';
import { FrameState } from '../../Map';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import Geometry from '../../geom/Geometry';
import Layer from '../../layer/Layer';
import Source from '../../source/Source';
import { UniformValue } from '../../webgl/Helper';
import LayerRenderer from '../Layer';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';
import WebGLLayerRenderer, { PostProcessesOptions } from './Layer';
import { DefaultAttributes } from './shaders';

export type TWebGLVectorLayerRendererBaseEventTypes = 'change' | 'error';
/**
 * A callback computing
 * the value of a custom attribute (different for each feature) to be passed on to the GPU.
 * Properties are available as 2nd arg for quicker access.
 */
export type CustomAttributeCallback = (p0: Feature<Geometry>, p1: Record<string, any>) => number;
export interface Options {
    className?: string | undefined;
    fill?: ShaderProgram | undefined;
    stroke?: ShaderProgram | undefined;
    point?: ShaderProgram | undefined;
    uniforms?: Record<string, UniformValue> | undefined;
    postProcesses?: PostProcessesOptions[] | undefined;
}
/**
 * An object containing both shaders (vertex and fragment) as well as the required attributes
 */
export interface ShaderProgram {
    vertexShader?: string | undefined;
    fragmentShader?: string | undefined;
    attributes: Record<DefaultAttributes, CustomAttributeCallback>;
}
export default class WebGLVectorLayerRenderer extends WebGLLayerRenderer {
    constructor(layer: Layer<Source, LayerRenderer>, options: Options);
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
    prepareFrameInternal(frameState: FrameState): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState): HTMLElement;
    on(type: TWebGLVectorLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLVectorLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLVectorLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLVectorLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLVectorLayerRendererBaseEventTypes | TWebGLVectorLayerRendererBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
}
