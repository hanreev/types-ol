import Comparison from 'ol/format/filter/Comparison';

export default abstract class ComparisonBinary extends Comparison {
    constructor(tagName: string, propertyName: string, expression: string | number, opt_matchCase?: boolean);
}
