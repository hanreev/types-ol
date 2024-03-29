import { FrameState } from '../../Map';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import { Extent } from '../../extent';
import WebGLTileLayer from '../../layer/WebGLTile';
import { Pixel } from '../../pixel';
import { UniformValue } from '../../webgl/Helper';
import PaletteTexture from '../../webgl/PaletteTexture';
import TileTexture from '../../webgl/TileTexture';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';
import WebGLLayerRenderer from './Layer';

export type TWebGLTileLayerRendererBaseEventTypes = 'change' | 'error';
export type LayerType = WebGLTileLayer;
export interface Options {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: Record<string, UniformValue> | undefined;
    paletteTextures?: PaletteTexture[] | undefined;
    cacheSize?: number | undefined;
}
export default class WebGLTileLayerRenderer extends WebGLLayerRenderer {
    constructor(tileLayer: LayerType, options: Options);
    /**
     * Clean up.
     */
    disposeInternal(): void;
    enqueueTiles(
        frameState: FrameState,
        extent: Extent,
        initialZ: number,
        tileTexturesByZ: Record<number, TileTexture[]>,
        preload: number,
    ): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getData(pixel: Pixel): Uint8ClampedArray | Uint8Array | Float32Array | DataView;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    /**
     * Determine whether renderFrame should be called.
     */
    prepareFrameInternal(frameState: FrameState): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState): HTMLElement;
    reset(options: Options): void;
    on(type: TWebGLTileLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLTileLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLTileLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLTileLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLTileLayerRendererBaseEventTypes | TWebGLTileLayerRendererBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
}
