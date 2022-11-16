import { Color } from '../color';
import { ColorLike } from '../colorlike';
import { Size } from '../size';
import { IconAnchorUnits, IconOrigin } from './Icon';
import Style from './Style';
import { TextJustify, TextPlacement } from './Text';

/**
 * Circle style properties for rendering point features.  At least circle-radius must be provided.
 */
export interface FlatCircle {
    'circle-radius'?: number | undefined;
    'circle-fill-color'?: Color | ColorLike | undefined;
    'circle-stroke-color'?: Color | ColorLike | undefined;
    'circle-stroke-width'?: number | undefined;
    'circle-stroke-line-cap'?: CanvasLineCap | undefined;
    'circle-stroke-line-join'?: CanvasLineJoin | undefined;
    'circle-stroke-line-dash'?: number[] | undefined;
    'circle-stroke-line-dash-offset'?: number | undefined;
    'circle-stroke-miter-limit'?: number | undefined;
    'circle-displacement'?: number[] | undefined;
    'circle-scale'?: number | Size | undefined;
    'circle-rotation'?: number | undefined;
    'circle-rotate-with-view'?: boolean | undefined;
    'circle-declutter-mode'?: 'declutter' | 'obstacle' | 'none' | undefined;
}
/**
 * Fill style properties applied to polygon features.
 */
export interface FlatFill {
    'fill-color'?: Color | ColorLike | undefined;
}
/**
 * Icon style properties applied to point features.  One of icon-src or icon-img must be provided to render
 * points with an icon.
 */
export interface FlatIcon {
    'icon-src'?: string | undefined;
    'icon-img'?: HTMLImageElement | HTMLCanvasElement | undefined;
    'icon-img-size'?: Size | undefined;
    'icon-anchor'?: number[] | undefined;
    'icon-anchor-origin'?: IconOrigin | undefined;
    'icon-anchor-x-units'?: IconAnchorUnits | undefined;
    'icon-anchor-y-units'?: IconAnchorUnits | undefined;
    'icon-color'?: Color | string | undefined;
    'icon-cross-origin'?: null | string | undefined;
    'icon-offset'?: number[] | undefined;
    'icon-displacement'?: number[] | undefined;
    'icon-offset-origin'?: IconOrigin | undefined;
    'icon-opacity'?: number | undefined;
    'icon-scale'?: number | Size | undefined;
    'icon-rotation'?: number | undefined;
    'icon-rotate-with-view'?: boolean | undefined;
    'icon-size'?: Size | undefined;
    'icon-declutter-mode'?: 'declutter' | 'obstacle' | 'none' | undefined;
}
/**
 * Regular shape style properties for rendering point features.  At least shape-points must be provided.
 */
export interface FlatShape {
    'shape-points'?: number | undefined;
    'shape-fill-color'?: Color | ColorLike | undefined;
    'shape-stroke-color'?: Color | ColorLike | undefined;
    'shape-stroke-width'?: number | undefined;
    'shape-stroke-line-cap'?: CanvasLineCap | undefined;
    'shape-stroke-line-join'?: CanvasLineJoin | undefined;
    'shape-stroke-line-dash'?: number[] | undefined;
    'shape-stroke-line-dash-offset'?: number | undefined;
    'shape-stroke-miter-limit'?: number | undefined;
    'shape-radius'?: number | undefined;
    'shape-radius1'?: number | undefined;
    'shape-radius2'?: number | undefined;
    'shape-angle'?: number | undefined;
    'shape-displacement'?: number[] | undefined;
    'shape-rotation'?: number | undefined;
    'shape-rotate-with-view'?: boolean | undefined;
    'shape-scale'?: number | Size | undefined;
    'shape-declutter-mode'?: 'declutter' | 'obstacle' | 'none' | undefined;
}
/**
 * Stroke style properties applied to line strings and polygon boundaries.  To apply a stroke, at least one of
 * stroke-color or stroke-width must be provided.
 */
export interface FlatStroke {
    'stroke-color'?: Color | ColorLike | undefined;
    'stroke-width'?: number | undefined;
    'stroke-line-cap'?: CanvasLineCap | undefined;
    'stroke-line-join'?: CanvasLineJoin | undefined;
    'stroke-line-dash'?: number[] | undefined;
    'stroke-line-dash-offset'?: number | undefined;
    'stroke-miter-limit'?: number | undefined;
}
/**
 * For static styling, the [layer.setStyle()]{@link module:ol/layer/Vector~VectorLayer#setStyle} method
 * can be called with an object literal that has fill, stroke, text, icon, regular shape, and/or circle properties.
 */
export type FlatStyle = FlatFill | FlatStroke | FlatText | FlatIcon | FlatShape | FlatCircle;
/**
 * A flat style literal or an array of the same.
 */
export type FlatStyleLike = FlatStyle | FlatStyle[];
/**
 * Label style properties applied to all features.  At a minimum, a text-value must be provided.
 */
export interface FlatText {
    'text-value'?: string | string[] | undefined;
    'text-font'?: string | undefined;
    'text-max-angle'?: number | undefined;
    'text-offset-x'?: number | undefined;
    'text-offset-y'?: number | undefined;
    'text-overflow'?: boolean | undefined;
    'text-placement'?: TextPlacement | undefined;
    'text-scale'?: number | Size | undefined;
    'text-rotate-with-view'?: boolean | undefined;
    'text-rotation'?: number | undefined;
    'text-align'?: CanvasTextAlign | undefined;
    'text-justify'?: TextJustify | undefined;
    'text-baseline'?: CanvasTextBaseline | undefined;
    'text-padding'?: number[] | undefined;
    'text-fill-color'?: Color | ColorLike | undefined;
    'text-background-fill-color'?: Color | ColorLike | undefined;
    'text-stroke-color'?: Color | ColorLike | undefined;
    'text-stroke-line-cap'?: CanvasLineCap | undefined;
    'text-stroke-line-join'?: CanvasLineJoin | undefined;
    'text-stroke-line-dash'?: number[] | undefined;
    'text-stroke-line-dash-offset'?: number | undefined;
    'text-stroke-miter-limit'?: number | undefined;
    'text-stroke-width'?: number | undefined;
    'text-background-stroke-color'?: Color | ColorLike | undefined;
    'text-background-stroke-line-cap'?: CanvasLineCap | undefined;
    'text-background-stroke-line-join'?: CanvasLineJoin | undefined;
    'text-background-stroke-line-dash'?: number[] | undefined;
    'text-background-stroke-line-dash-offset'?: number | undefined;
    'text-background-stroke-miter-limit'?: number | undefined;
    'text-background-stroke-width'?: number | undefined;
}
export function toStyle(flatStyle: FlatStyle): Style;
