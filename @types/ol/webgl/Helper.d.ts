import Disposable from '../Disposable';
import { FrameState } from '../Map';
import { Transform } from '../transform';
import WebGLArrayBuffer from './Buffer';
import WebGLRenderTarget from './RenderTarget';

/**
 * Description of an attribute in a buffer
 */
export interface AttributeDescription {
    name: string;
    size: number;
    type?: AttributeType | undefined;
}
export interface BufferCacheEntry {
    buffer: WebGLArrayBuffer;
    webGlBuffer: WebGLBuffer;
}
export interface CanvasCacheItem {
    canvas: HTMLCanvasElement;
    users: number;
}
export interface Options {
    uniforms?: Record<string, UniformValue> | undefined;
    postProcesses?: PostProcessesOptions[] | undefined;
    canvasCacheKey?: string | undefined;
}
export interface PostProcessesOptions {
    scaleRatio?: number | undefined;
    vertexShader?: string | undefined;
    fragmentShader?: string | undefined;
    uniforms?: Record<string, UniformValue> | undefined;
}
export type UniformLiteralValue = number | number[] | HTMLCanvasElement | HTMLImageElement | ImageData | Transform;
/**
 * Uniform value can be a number, array of numbers (2 to 4), canvas element or a callback returning
 * one of the previous types.
 */
export type UniformValue = UniformLiteralValue | ((p0: FrameState) => UniformLiteralValue);
/**
 * Attribute types, either UNSIGNED_BYTE, UNSIGNED_SHORT, UNSIGNED_INT or FLOAT
 * Note: an attribute stored in a Float32Array should be of type FLOAT.
 */
export enum AttributeType {
    UNSIGNED_BYTE = 5121,
    UNSIGNED_SHORT = 5123,
    UNSIGNED_INT = 5125,
    FLOAT = 5126,
}
/**
 * Names of uniforms made available to all shaders.
 * Please note: changing these will break custom shaders!
 */
export enum DefaultUniform {
    PROJECTION_MATRIX = 'u_projectionMatrix',
    OFFSET_SCALE_MATRIX = 'u_offsetScaleMatrix',
    OFFSET_ROTATION_MATRIX = 'u_offsetRotateMatrix',
    TIME = 'u_time',
    ZOOM = 'u_zoom',
    RESOLUTION = 'u_resolution',
    SIZE_PX = 'u_sizePx',
    PIXEL_RATIO = 'u_pixelRatio',
}
/**
 * Shader types, either FRAGMENT_SHADER or VERTEX_SHADER.
 */
export enum ShaderType {
    FRAGMENT_SHADER = 35632,
    VERTEX_SHADER = 35633,
}
export default class WebGLHelper extends Disposable {
    constructor(options?: Options);
    /**
     * Sets the default matrix uniforms for a given frame state. This is called internally in prepareDraw.
     */
    applyFrameState(frameState: FrameState): void;
    /**
     * Sets the custom uniforms based on what was given in the constructor. This is called internally in prepareDraw.
     */
    applyUniforms(frameState: FrameState): void;
    /**
     * Just bind the buffer if it's in the cache. Otherwise create
     * the WebGL buffer, bind it, populate it, and add an entry to
     * the cache.
     */
    bindBuffer(buffer: WebGLArrayBuffer): void;
    canvasCacheKeyMatches(canvasCacheKey: string): boolean;
    /**
     * Will attempt to compile a vertex or fragment shader based on source
     * On error, the shader will be returned but
     * gl.getShaderParameter(shader, gl.COMPILE_STATUS) will return true
     * Use gl.getShaderInfoLog(shader) to have details
     */
    compileShader(source: string, type: ShaderType): WebGLShader;
    /**
     * Will create or reuse a given webgl texture and apply the given size. If no image data
     * specified, the texture will be empty, otherwise image data will be used and the size
     * parameter will be ignored.
     * Note: wrap parameters are set to clamp to edge, min filter is set to linear.
     */
    createTexture(
        size: number[],
        data?: ImageData | HTMLImageElement | HTMLCanvasElement,
        texture?: WebGLTexture,
    ): WebGLTexture;
    deleteBuffer(buf: WebGLArrayBuffer): void;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    /**
     * Execute a draw call based on the currently bound program, texture, buffers, attributes.
     */
    drawElements(start: number, end: number): void;
    /**
     * Will enable the following attributes to be read from the currently bound buffer,
     * i.e. tell the GPU where to read the different attributes in the buffer. An error in the
     * size/type/order of attributes will most likely break the rendering and throw a WebGL exception.
     */
    enableAttributes(attributes: AttributeDescription[]): void;
    /**
     * Apply the successive post process passes which will eventually render to the actual canvas.
     */
    finalizeDraw(
        frameState: FrameState,
        preCompose?: (p0: WebGLRenderingContext, p1: FrameState) => void,
        postCompose?: (p0: WebGLRenderingContext, p1: FrameState) => void,
    ): void;
    /**
     * Update the data contained in the buffer array; this is required for the
     * new data to be rendered
     */
    flushBufferData(buffer: WebGLArrayBuffer): void;
    /**
     * Will get the location from the shader or the cache
     */
    getAttributeLocation(name: string): number;
    getCanvas(): HTMLCanvasElement;
    /**
     * Get a WebGL extension.  If the extension is not supported, null is returned.
     * Extensions are cached after they are enabled for the first time.
     */
    getExtension(name: string): object | null;
    /**
     * Get the WebGL rendering context
     */
    getGL(): WebGLRenderingContext;
    /**
     * Create a program for a vertex and fragment shader.  Throws if shader compilation fails.
     */
    getProgram(fragmentShaderSource: string, vertexShaderSource: string): WebGLProgram;
    /**
     * Will get the location from the shader or the cache
     */
    getUniformLocation(name: string): WebGLUniformLocation;
    /**
     * Modifies the given transform to apply the rotation/translation/scaling of the given frame state.
     * The resulting transform can be used to convert world space coordinates to view coordinates.
     */
    makeProjectionTransform(frameState: FrameState, transform: Transform): Transform;
    /**
     * Clear the buffer & set the viewport to draw.
     * Post process passes will be initialized here, the first one being bound as a render target for
     * subsequent draw calls.
     */
    prepareDraw(frameState: FrameState, disableAlphaBlend?: boolean): void;
    /**
     * Clear the render target & bind it for future draw operations.
     * This is similar to prepareDraw, only post processes will not be applied.
     * Note: the whole viewport will be drawn to the render target, regardless of its size.
     */
    prepareDrawToRenderTarget(
        frameState: FrameState,
        renderTarget: WebGLRenderTarget,
        disableAlphaBlend?: boolean,
    ): void;
    /**
     * Give a value for a standard float uniform
     */
    setUniformFloatValue(uniform: string, value: number): void;
    /**
     * Give a value for a vec2 uniform
     */
    setUniformFloatVec2(uniform: string, value: number[]): void;
    /**
     * Give a value for a vec4 uniform
     */
    setUniformFloatVec4(uniform: string, value: number[]): void;
    /**
     * Give a value for a standard matrix4 uniform
     */
    setUniformMatrixValue(uniform: string, value: number[]): void;
    setUniforms(uniforms: Record<string, UniformValue>): void;
    /**
     * Set up a program for use. The program will be set as the current one. Then, the uniforms used
     * in the program will be set based on the current frame state and the helper configuration.
     */
    useProgram(program: WebGLProgram, frameState: FrameState): void;
}
/**
 * Compute a stride in bytes based on a list of attributes
 */
export function computeAttributesStride(attributes: AttributeDescription[]): number;
