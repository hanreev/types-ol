import { EventsKey } from '../../events';
import BaseEvent from '../../events/Event';
import Feature from '../../Feature';
import VectorLayer from '../../layer/Vector';
import { TransformFunction } from '../../proj';
import BuilderGroup from '../../render/canvas/BuilderGroup';
import Style from '../../style/Style';
import CanvasLayerRenderer from './Layer';

export default class CanvasVectorLayerRenderer extends CanvasLayerRenderer<LayerType> {
    constructor(vectorLayer: VectorLayer);
    renderFeature(
        feature: Feature<GeomType>,
        squaredTolerance: number,
        styles: Style | Style[],
        builderGroup: BuilderGroup,
        opt_transform: TransformFunction,
    ): boolean;
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
