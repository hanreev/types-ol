import { Transform } from '../../transform';

/**
 * This message will trigger the generation of a vertex and an index buffer based on the given render instructions.
 * When the buffers are generated, the worked will send a message of the same type to the main thread, with
 * the generated buffers in it.
 * Note that any addition properties present in the message will be sent back to the main thread.
 */
export interface WebGLWorkerGenerateBuffersMessage {
    id: number;
    type: WebGLWorkerMessageType;
    renderInstructions: ArrayBuffer;
    customAttributesCount?: number | undefined;
    vertexBuffer?: ArrayBuffer | undefined;
    indexBuffer?: ArrayBuffer | undefined;
    renderInstructionsTransform?: Transform | undefined;
}
export enum WebGLWorkerMessageType {
    GENERATE_POLYGON_BUFFERS = 'GENERATE_POLYGON_BUFFERS',
    GENERATE_POINT_BUFFERS = 'GENERATE_POINT_BUFFERS',
    GENERATE_LINE_STRING_BUFFERS = 'GENERATE_LINE_STRING_BUFFERS',
}
