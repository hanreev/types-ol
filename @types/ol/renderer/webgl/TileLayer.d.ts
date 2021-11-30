import { FrameState } from '../../PluggableMap';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import { Extent } from '../../extent';
import WebGLTileLayer from '../../layer/WebGLTile';
import { Pixel } from '../../pixel';
import TileSource from '../../source/Tile';
import { UniformValue } from '../../webgl/Helper';
import TileTexture from '../../webgl/TileTexture';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';
import WebGLLayerRenderer from './Layer';

export type TWebGLTileLayerRendererBaseEventTypes = 'change' | 'error';
export type LayerType = WebGLTileLayer<TileSource>;
export interface Options {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: Record<string, UniformValue>;
    cacheSize?: number;
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
        z: number,
        tileTexturesByZ: Record<number, TileTexture[]>,
    ): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getDataAtPixel(pixel: Pixel, frameState: FrameState, hitTolerance: number): Uint8ClampedArray | Uint8Array;
    getLayer(): WebGLTileLayer<TileSource>;
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
    on(type: TWebGLTileLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    on(type: TWebGLTileLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    once(type: TWebGLTileLayerRendererBaseEventTypes, listener: ListenerFunction<BaseEvent>): EventsKey;
    once(type: TWebGLTileLayerRendererBaseEventTypes[], listener: ListenerFunction<BaseEvent>): EventsKey[];
    un(
        type: TWebGLTileLayerRendererBaseEventTypes | TWebGLTileLayerRendererBaseEventTypes[],
        listener: ListenerFunction<BaseEvent>,
    ): void;
}
