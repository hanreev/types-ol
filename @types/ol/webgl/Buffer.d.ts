export enum BufferUsage {
    STREAM_DRAW = 0x88e0,
    STATIC_DRAW = 0x88e4,
    DYNAMIC_DRAW = 0x88e8,
}
export default class WebGLArrayBuffer {
    constructor(type: number, opt_usage?: number);
    fromArray(array: number[]): void;
    fromArrayBuffer(buffer: ArrayBuffer): void;
    getArray(): Float32Array | Uint32Array;
    getType(): number;
    getUsage(): number;
    ofSize(size: number): void;
}
export function getArrayClassForType(type: number): Float32ArrayConstructor | Uint32ArrayConstructor;
