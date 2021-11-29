import { FrameState } from '../../PluggableMap';
import Tile from '../../Tile';
import { Coordinate } from '../../coordinate';
import { EventsKey, ListenerFunction } from '../../events';
import BaseEvent from '../../events/Event';
import WebGLTileLayer from '../../layer/WebGLTile';
import { Pixel } from '../../pixel';
import { UniformValue } from '../../webgl/Helper';
import { HitMatch } from '../Map';
import { FeatureCallback } from '../vector';
import WebGLLayerRenderer from './Layer';

export type TWebGLTileLayerRendererBaseEventTypes = 'change' | 'error';
export interface Options {
    vertexShader: string;
    fragmentShader: string;
    uniforms?: Record<string, UniformValue>;
    className?: string;
    cacheSize?: number;
}
export default class WebGLTileLayerRenderer extends WebGLLayerRenderer {
    constructor(tileLayer: WebGLTileLayer, options: Options);
    protected isDrawableTile(tile: Tile): boolean;
    /**
     * Clean up.
     */
    disposeInternal(): void;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getDataAtPixel(pixel: Pixel, frameState: FrameState, hitTolerance: number): Uint8ClampedArray | Uint8Array;
    getLayer(): WebGLTileLayer;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    /**
     * Determine whether render should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
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
