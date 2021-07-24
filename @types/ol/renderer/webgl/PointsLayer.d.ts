import Feature from '../../Feature';
import { FrameState } from '../../PluggableMap';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import Geometry from '../../geom/Geometry';
import Layer from '../../layer/Layer';
import { Pixel } from '../../pixel';
import Source from '../../source/Source';
import { UniformValue } from '../../webgl/Helper';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';
import WebGLLayerRenderer, { PostProcessesOptions } from './Layer';

export type TWebGLPointsLayerRendererBaseEventTypes = 'change' | 'error';
/**
 * A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 */
export interface CustomAttribute {
    name: string;
    callback: (p0: Feature<Geometry>, p1: { [key: string]: any }) => number;
}
/**
 * Object that holds a reference to a feature, its geometry and properties. Used to optimize
 * rebuildBuffers by accessing these objects quicker.
 */
export interface FeatureCacheItem {
    feature: Feature<Geometry>;
    properties: { [key: string]: any };
    geometry: Geometry;
}
export interface Options {
    className?: string;
    attributes?: CustomAttribute[];
    vertexShader: string;
    fragmentShader: string;
    hitVertexShader?: string;
    hitFragmentShader?: string;
    uniforms?: { [key: string]: UniformValue };
    postProcesses?: PostProcessesOptions[];
}
export default class WebGLPointsLayerRenderer extends WebGLLayerRenderer {
    constructor(layer: Layer<Source>, options: Options);
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
    getDataAtPixel(pixel: Pixel, frameState: FrameState, hitTolerance: number): Uint8ClampedArray | Uint8Array;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    /**
     * Determine whether render should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState): HTMLElement;
    /**
     * Render the hit detection data to the corresponding render target
     */
    renderHitDetection(frameState: FrameState): void;
    on(type: TWebGLPointsLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLPointsLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLPointsLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLPointsLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLPointsLayerRendererBaseEventTypes | TWebGLPointsLayerRendererBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
}
