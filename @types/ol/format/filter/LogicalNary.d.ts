import Filter from 'ol/format/filter/Filter';

export default abstract class LogicalNary extends Filter {
    constructor(tagName: string, conditions: Filter[]);
}
