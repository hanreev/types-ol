import Feature from '../../Feature';
import { FrameState } from '../../Map';
import Geometry, { Type } from '../../geom/Geometry';
import { Transform } from '../../transform';
import WebGLHelper, { AttributeDescription } from '../../webgl/Helper';
import { GeometryBatch } from './MixedGeometryBatch';

/**
 * A description of a custom attribute to be passed on to the GPU, with a value different
 * for each feature.
 */
export interface CustomAttribute {
    name: string;
    callback: (p0: Feature<Geometry>) => number;
}
export default class AbstractBatchRenderer {
    constructor(
        helper: WebGLHelper,
        worker: Worker,
        vertexShader: string,
        fragmentShader: string,
        customAttributes: CustomAttribute[],
    );
    /**
     * A list of attributes used by the renderer.
     */
    protected attributes: AttributeDescription[];
    protected customAttributes: CustomAttribute[];
    /**
     * Rebuild rendering instructions based on the provided frame state
     * This is specific to the geometry type and has to be implemented by subclasses.
     */
    protected generateRenderInstructions(batch: GeometryBatch): void;
    /**
     * Rebuild rendering instructions and webgl buffers based on the provided frame state
     * Note: this is a costly operation.
     */
    rebuild(batch: GeometryBatch, frameState: FrameState, geometryType: Type, callback: () => void): void;
    /**
     * Render the geometries in the batch. This will also update the current transform used for rendering according to
     * the invert transform of the webgl buffers
     */
    render(batch: GeometryBatch, currentTransform: Transform, frameState: FrameState, offsetX: number): void;
}
