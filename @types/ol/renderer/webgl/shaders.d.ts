import { Color } from '../../color';

export type DefaultAttributes = 'color' | 'opacity' | 'width';
/**
 * Default polygon fragment shader.
 */
export const FILL_FRAGMENT_SHADER: string;
/**
 * Default polygon vertex shader.
 * Relies on the color and opacity attributes.
 */
export const FILL_VERTEX_SHADER: string;
/**
 * Default point fragment shader.
 */
export const POINT_FRAGMENT_SHADER: string;
/**
 * Default point vertex shader.
 * Relies on color and opacity attributes.
 */
export const POINT_VERTEX_SHADER: string;
/**
 * Default linestring fragment shader.
 */
export const STROKE_FRAGMENT_SHADER: string;
/**
 * Default linestring vertex shader.
 * Relies on color, opacity and width attributes.
 */
export const STROKE_VERTEX_SHADER: string;
/**
 * Packs red/green/blue channels of a color into a single float value; alpha is ignored.
 * This is how the color is expected to be computed.
 */
export function packColor(color: Color | string): number;
