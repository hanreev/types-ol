import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
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
export default class WebGLLayerRenderer<LayerType extends Layer<SourceType>> extends LayerRenderer<LayerType> {
    constructor(layer: LayerType, opt_options?: Options);
    protected helper: WebGLHelper;
    getShaderCompileErrors(): string;
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
export function colorDecodeId(color: number[]): number;
export function colorEncodeId(id: number, opt_array?: number[]): number[];
