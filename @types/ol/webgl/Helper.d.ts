import Disposable from '../Disposable';
import { FrameState } from '../PluggableMap';
import { Transform } from '../transform';
import WebGLArrayBuffer from './Buffer';

export interface BufferCacheEntry {
    buffer: WebGLArrayBuffer;
    webGlBuffer: WebGLBuffer;
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
export type UniformLiteralValue = number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | Transform;
export type UniformValue = UniformLiteralValue | ((p0: FrameState) => UniformLiteralValue);
export enum DefaultAttrib {
    POSITION = 'a_position',
    TEX_COORD = 'a_texCoord',
    OPACITY = 'a_opacity',
    ROTATE_WITH_VIEW = 'a_rotateWithView',
    OFFSETS = 'a_offsets',
    COLOR = 'a_color',
}
export enum DefaultUniform {
    PROJECTION_MATRIX = 'u_projectionMatrix',
    OFFSET_SCALE_MATRIX = 'u_offsetScaleMatrix',
    OFFSET_ROTATION_MATRIX = 'u_offsetRotateMatrix',
}
export enum ShaderType {
    FRAGMENT_SHADER = 35632,
    VERTEX_SHADER = 35633,
}
export default class WebGLHelper extends Disposable {
    constructor(opt_options?: Options);
    bindBuffer(buffer: WebGLArrayBuffer): void;
    compileShader(source: string, type: ShaderType): WebGLShader;
    createEmptyTexture(width: number, height: number, opt_wrapS?: number, opt_wrapT?: number): WebGLTexture;
    createTexture(
        image: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement,
        opt_wrapS?: number,
        opt_wrapT?: number
    ): WebGLTexture;
    createTextureInternal(opt_wrapS?: number, opt_wrapT?: number): WebGLTexture;
    deleteBuffer(buf: WebGLArrayBuffer): void;
    drawElements(start: number, end: number): void;
    enableAttributeArray(attribName: string, size: number, type: number, stride: number, offset: number): void;
    finalizeDraw(frameState: FrameState): void;
    flushBufferData(buffer: WebGLArrayBuffer): void;
    getAttributeLocation(name: string): number;
    getCanvas(): HTMLCanvasElement;
    getGL(): WebGLRenderingContext;
    getProgram(fragmentShaderSource: string, vertexShaderSource: string): WebGLProgram;
    getShaderCompileErrors(): string;
    getUniformLocation(name: string): WebGLUniformLocation;
    makeProjectionTransform(frameState: FrameState, transform: Transform): Transform;
    prepareDraw(frameState: FrameState): void;
    setUniformFloatValue(uniform: string, value: number): void;
    setUniformMatrixValue(uniform: string, value: number[]): void;
    useProgram(program: WebGLProgram): boolean;
}
