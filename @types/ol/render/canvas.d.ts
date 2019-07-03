import { ColorLike } from '../colorlike';
import Fill from '../style/Fill';
import Stroke from '../style/Stroke';
import { Transform } from '../transform';
import LabelCache from './canvas/LabelCache';

export type DeclutterGroup = any[];
export interface FillState {
    fillStyle: ColorLike;
}
export interface FillStrokeState {
    currentFillStyle?: ColorLike;
    currentStrokeStyle?: ColorLike;
    currentLineCap?: string;
    currentLineDash: number[];
    currentLineDashOffset?: number;
    currentLineJoin?: string;
    currentLineWidth?: number;
    currentMiterLimit?: number;
    lastStroke?: number;
    fillStyle?: ColorLike;
    strokeStyle?: ColorLike;
    lineCap?: string;
    lineDash: number[];
    lineDashOffset?: number;
    lineJoin?: string;
    lineWidth?: number;
    miterLimit?: number;
}
export interface StrokeState {
    lineCap: string;
    lineDash: number[];
    lineDashOffset: number;
    lineJoin: string;
    lineWidth: number;
    miterLimit: number;
    strokeStyle: ColorLike;
}
export interface TextState {
    font: string;
    textAlign?: string;
    textBaseline: string;
    placement?: string;
    maxAngle?: number;
    overflow?: boolean;
    backgroundFill?: Fill;
    backgroundStroke?: Stroke;
    scale?: number;
    padding?: number[];
}
export const labelCache: LabelCache;
export function drawImage(
    context: CanvasRenderingContext2D,
    transform: Transform,
    opacity: number,
    image: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    originX: number,
    originY: number,
    w: number,
    h: number,
    x: number,
    y: number,
    scale: number
): void;
export function measureAndCacheTextWidth(font: string, text: string, cache: { [key: string]: number }): number;
export function measureTextWidth(font: string, text: string): number;
export function measureTextWidths(font: string, lines: string[], widths: number[]): number;
export function rotateAtOffset(
    context: CanvasRenderingContext2D,
    rotation: number,
    offsetX: number,
    offsetY: number
): void;
