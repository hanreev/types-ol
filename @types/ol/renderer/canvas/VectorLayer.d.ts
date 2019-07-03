import { EventsKey } from '../../events';
import Event from '../../events/Event';
import Feature from '../../Feature';
import VectorLayer from '../../layer/Vector';
import BuilderGroup from '../../render/canvas/BuilderGroup';
import Style from '../../style/Style';
import CanvasLayerRenderer from './Layer';

export default class CanvasVectorLayerRenderer extends CanvasLayerRenderer {
    constructor(vectorLayer: VectorLayer);
    renderFeature(
        feature: Feature,
        resolution: number,
        pixelRatio: number,
        styles: Style | Style[],
        builderGroup: BuilderGroup
    ): boolean;
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
