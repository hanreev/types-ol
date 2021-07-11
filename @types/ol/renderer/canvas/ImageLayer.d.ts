import ImageBase from 'ol/ImageBase';
import { FrameState } from 'ol/PluggableMap';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import ImageLayer from 'ol/layer/Image';
import { HitMatch } from 'ol/renderer/Map';
import CanvasLayerRenderer from 'ol/renderer/canvas/Layer';
import { FeatureCallback } from 'ol/renderer/vector';
import ImageSource from 'ol/source/Image';

export default class CanvasImageLayerRenderer extends CanvasLayerRenderer {
    constructor(imageLayer: ImageLayer<ImageSource>);
    protected image_: ImageBase;
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    getImage(): HTMLCanvasElement | HTMLImageElement | HTMLVideoElement;
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
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement;
    on(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => any): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => any): void;
    on(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'change', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'change', listener: (evt: BaseEvent) => void): void;
    on(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    once(type: 'error', listener: (evt: BaseEvent) => void): EventsKey;
    un(type: 'error', listener: (evt: BaseEvent) => void): void;
}
