import { Color } from '../color';

export interface LiteralStyle {
    symbol?: LiteralSymbolStyle;
}
export interface LiteralSymbolStyle {
    size: number | number[];
    symbolType: SymbolType;
    src?: string;
    color?: Color | string;
    opacity?: number;
    offset?: number[];
    textureCoord?: number[];
    rotateWithView?: boolean;
}
export enum SymbolType {
    CIRCLE = 'circle',
    SQUARE = 'square',
    TRIANGLE = 'triangle',
    IMAGE = 'image',
}
