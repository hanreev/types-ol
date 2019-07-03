import { EventsKey } from '../../events';
import Event from '../../events/Event';
import { FeatureLike } from '../../Feature';
import VectorTileLayer from '../../layer/VectorTile';
import { FrameState } from '../../PluggableMap';
import Projection from '../../proj/Projection';
import BuilderGroup from '../../render/canvas/BuilderGroup';
import Style from '../../style/Style';
import VectorRenderTile from '../../VectorRenderTile';
import CanvasTileLayerRenderer from './TileLayer';

export default class CanvasVectorTileLayerRenderer extends CanvasTileLayerRenderer {
    constructor(layer: VectorTileLayer);
    prepareTile(tile: VectorRenderTile, pixelRatio: number, projection: Projection, queue: boolean): boolean;
    renderFeature(
        feature: FeatureLike,
        squaredTolerance: number,
        styles: Style | Style[],
        executorGroup: BuilderGroup
    ): boolean;
    renderQueuedTileImages_(hifi: boolean, frameState: FrameState): void;
    on(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    once(type: string | string[], listener: (p0: any) => void): EventsKey | EventsKey[];
    un(type: string | string[], listener: (p0: any) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'error', listener: (evt: Event) => void): EventsKey;
    once(type: 'error', listener: (evt: Event) => void): EventsKey;
    un(type: 'error', listener: (evt: Event) => void): void;
}
