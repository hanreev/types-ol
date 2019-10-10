import { CustomAttribute } from '../renderer/webgl/PointsLayer';
import { LiteralSymbolStyle } from '../style/LiteralStyle';
import { UniformValue } from './Helper';

export type OperatorValue = any[] | number;
export interface ShaderParameters {
    uniforms?: string[];
    attributes?: string[];
    varyings?: VaryingDescription[];
    sizeExpression: string;
    offsetExpression: string;
    colorExpression: string;
    texCoordExpression: string;
    rotateWithView?: boolean;
}
export interface StyleParseResult {
    params: ShaderParameters;
    uniforms: { [key: string]: UniformValue };
    attributes: CustomAttribute[];
}
export interface VaryingDescription {
    name: string;
    type: string;
    expression: string;
}
export function formatArray(array: number[]): string;
export function formatColor(colorArray: number[]): string;
export function formatNumber(v: number): string;
export function getSymbolFragmentShader(parameters: ShaderParameters): string;
export function getSymbolVertexShader(parameters: ShaderParameters): string;
export function parse(value: OperatorValue, attributes: string[], attributePrefix: string): string;
export function parseSymbolStyle(style: LiteralSymbolStyle): StyleParseResult;
