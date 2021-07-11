import Feature from 'ol/Feature';
import { FrameState } from 'ol/PluggableMap';
import { Coordinate } from 'ol/coordinate';
import { EventsKey } from 'ol/events';
import BaseEvent from 'ol/events/Event';
import Geometry from 'ol/geom/Geometry';
import VectorLayer from 'ol/layer/Vector';
import { Pixel } from 'ol/pixel';
import { TransformFunction } from 'ol/proj';
import BuilderGroup from 'ol/render/canvas/BuilderGroup';
import ExecutorGroup from 'ol/render/canvas/ExecutorGroup';
import { HitMatch } from 'ol/renderer/Map';
import CanvasLayerRenderer from 'ol/renderer/canvas/Layer';
import { FeatureCallback } from 'ol/renderer/vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import RBush from 'rbush';

export default class CanvasVectorLayerRenderer extends CanvasLayerRenderer {
    constructor(vectorLayer: VectorLayer<VectorSource<Geometry>>);
    forEachFeatureAtCoordinate<T>(
        coordinate: Coordinate,
        frameState: FrameState,
        hitTolerance: number,
        callback: FeatureCallback<T>,
        matches: HitMatch<T>[],
    ): T | undefined;
    /**
     * Asynchronous layer level hit detection.
     */
    getFeatures(pixel: Pixel): Promise<Feature<Geometry>[]>;
    /**
     * Perform action necessary to get the layer rendered after new fonts have loaded
     */
    handleFontsChanged(): void;
    /**
     * Determine whether render should be called.
     */
    prepareFrame(frameState: FrameState): boolean;
    /**
     * Render declutter items for this layer
     */
    renderDeclutter(frameState: FrameState): void;
    renderFeature(
        feature: Feature<Geometry>,
        squaredTolerance: number,
        styles: Style | Style[],
        builderGroup: BuilderGroup,
        opt_transform?: TransformFunction,
        opt_declutterBuilderGroup?: BuilderGroup,
    ): boolean;
    /**
     * Render the layer.
     */
    renderFrame(frameState: FrameState, target: HTMLElement): HTMLElement;
    renderWorlds(executorGroup: ExecutorGroup, frameState: FrameState, opt_declutterTree?: RBush<any>): void;
    /**
     * Get a rendering container from an existing target, if compatible.
     */
    useContainer(target: HTMLElement, transform: string, opacity: number): void;
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
