/**
 * An object holding positions both in an index and a vertex buffer.
 */
export interface BufferPositions {
    vertexPosition: number;
    indexPosition: number;
}
/**
 * Reads an id from a color-encoded array
 * Note: the expected range for each component is 0 to 1 with 256 steps.
 */
export function colorDecodeId(color: number[]): number;
/**
 * Generates a color array based on a numerical id
 * Note: the range for each component is 0 to 1 with 256 steps
 */
export function colorEncodeId(id: number, array?: number[]): number[];
