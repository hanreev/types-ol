import WebGLHelper from '../../webgl/Helper';
import AbstractBatchRenderer, { CustomAttribute } from './BatchRenderer';

/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these will break custom shaders!
 */
export enum Attributes {
    SEGMENT_START = 'a_segmentStart',
    SEGMENT_END = 'a_segmentEnd',
    PARAMETERS = 'a_parameters',
}
export default class LineStringBatchRenderer extends AbstractBatchRenderer {
    constructor(
        helper: WebGLHelper,
        worker: Worker,
        vertexShader: string,
        fragmentShader: string,
        customAttributes: CustomAttribute[],
    );
}
