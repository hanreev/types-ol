import Filter from 'ol/format/filter/Filter';

export default abstract class Comparison extends Filter {
    constructor(tagName: string, propertyName: string);
}
