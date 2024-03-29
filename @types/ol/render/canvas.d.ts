import BaseObject from '../Object';
import { ColorLike } from '../colorlike';
import { Size } from '../size';
import Fill from '../style/Fill';
import Stroke from '../style/Stroke';
import { TextJustify, TextPlacement } from '../style/Text';
import { Transform } from '../transform';
import { ReplayImageOrLabelArgs } from './canvas/Executor';

export type BuilderType = 'Circle' | 'Image' | 'LineString' | 'Polygon' | 'Text' | 'Default';
export type DeclutterImageWithText = Record<number, ReplayImageOrLabelArgs>;
export interface FillState {
    fillStyle: ColorLike;
}
export interface FillStrokeState {
    currentFillStyle?: ColorLike | undefined;
    currentStrokeStyle?: ColorLike | undefined;
    currentLineCap?: CanvasLineCap | undefined;
    currentLineDash: number[];
    currentLineDashOffset?: number | undefined;
    currentLineJoin?: CanvasLineJoin | undefined;
    currentLineWidth?: number | undefined;
    currentMiterLimit?: number | undefined;
    lastStroke?: number | undefined;
    fillStyle?: ColorLike | undefined;
    strokeStyle?: ColorLike | undefined;
    lineCap?: CanvasLineCap | undefined;
    lineDash: number[];
    lineDashOffset?: number | undefined;
    lineJoin?: CanvasLineJoin | undefined;
    lineWidth?: number | undefined;
    miterLimit?: number | undefined;
}
export interface Label {
    width: number;
    height: number;
    contextInstructions: (string | number)[];
}
export interface SerializableInstructions {
    instructions: any[];
    hitDetectionInstructions: any[];
    coordinates: number[];
    textStates?: Record<string, TextState> | undefined;
    fillStates?: Record<string, FillState> | undefined;
    strokeStates?: Record<string, StrokeState> | undefined;
}
export interface StrokeState {
    lineCap: CanvasLineCap;
    lineDash: number[];
    lineDashOffset: number;
    lineJoin: CanvasLineJoin;
    lineWidth: number;
    miterLimit: number;
    strokeStyle: ColorLike;
}
export interface TextState {
    font: string;
    textAlign?: CanvasTextAlign | undefined;
    justify?: TextJustify | undefined;
    textBaseline: CanvasTextBaseline;
    placement?: TextPlacement | undefined;
    maxAngle?: number | undefined;
    overflow?: boolean | undefined;
    backgroundFill?: Fill | undefined;
    backgroundStroke?: Stroke | undefined;
    scale?: Size | undefined;
    padding?: number[] | undefined;
}
export const checkedFonts: BaseObject;
export const defaultFillStyle: ColorLike;
export const defaultFont: string;
export const defaultLineCap: CanvasLineCap;
export const defaultLineDash: number[];
export const defaultLineDashOffset: number;
export const defaultLineJoin: CanvasLineJoin;
export const defaultLineWidth: number;
export const defaultMiterLimit: number;
export const defaultPadding: number[];
export const defaultStrokeStyle: ColorLike;
export const defaultTextAlign: CanvasTextAlign;
export const defaultTextBaseline: CanvasTextBaseline;
/**
 * Clears the label cache when a font becomes available.
 */
export const registerFont: (fontSpec: string) => void;
export const textHeights: Record<string, number>;
export function drawImageOrLabel(
    context: CanvasRenderingContext2D,
    transform: Transform | null,
    opacity: number,
    labelOrImage: Label | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement,
    originX: number,
    originY: number,
    w: number,
    h: number,
    x: number,
    y: number,
    scale: Size,
): void;
export function getTextDimensions(baseStyle: TextState, chunks: string[]): any;
/**
 * Measure text width using a cache.
 */
export function measureAndCacheTextWidth(font: string, text: string, cache: Record<string, number>): number;
export function measureTextHeight(font: string): number;
export function measureTextWidth(font: string, text: string): number;
export function rotateAtOffset(
    context: CanvasRenderingContext2D,
    rotation: number,
    offsetX: number,
    offsetY: number,
): void;
