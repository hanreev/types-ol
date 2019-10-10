import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
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
        executorGroup: BuilderGroup,
    ): boolean;
    renderQueuedTileImages_(hifi: boolean, frameState: FrameState): void;
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
