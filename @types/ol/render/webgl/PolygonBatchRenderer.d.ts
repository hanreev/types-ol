import WebGLHelper from '../../webgl/Helper';
import AbstractBatchRenderer, { CustomAttribute } from './BatchRenderer';

/**
 * Names of attributes made available to the vertex shader.
 * Please note: changing these will break custom shaders!
 */
export enum Attributes {
    POSITION = 'a_position',
}
export default class PolygonBatchRenderer extends AbstractBatchRenderer {
    constructor(
        helper: WebGLHelper,
        worker: Worker,
        vertexShader: string,
        fragmentShader: string,
        customAttributes: CustomAttribute[],
    );
}
