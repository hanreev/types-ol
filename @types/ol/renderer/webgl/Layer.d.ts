import { EventsKey } from '../../events';
import Event from '../../events/Event';
import Layer from '../../layer/Layer';
import WebGLHelper, { UniformValue } from '../../webgl/Helper';
import LayerRenderer from '../Layer';

export interface BufferPositions {
    vertexPosition: number;
    indexPosition: number;
}
export interface Options {
    uniforms?: { [key: string]: UniformValue };
    postProcesses?: PostProcessesOptions[];
}
export interface PostProcessesOptions {
    scaleRatio?: number;
    vertexShader?: string;
    fragmentShader?: string;
    uniforms?: { [key: string]: UniformValue };
}
export interface WebGLWorkerGenerateBuffersMessage {
    type: WebGLWorkerMessageType;
    renderInstructions: ArrayBuffer;
    vertexBuffer?: ArrayBuffer;
    indexBuffer?: ArrayBuffer;
    customAttributesCount?: number;
}
export enum WebGLWorkerMessageType {
    GENERATE_BUFFERS = 'GENERATE_BUFFERS',
}
export default class WebGLLayerRenderer extends LayerRenderer {
    constructor(layer: Layer, opt_options?: Options);
    protected helper: WebGLHelper;
    getShaderCompileErrors(): string;
    on(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'error', listener: (evt: Event) => void): EventsKey;
    once(type: 'error', listener: (evt: Event) => void): EventsKey;
    un(type: 'error', listener: (evt: Event) => void): void;
}
