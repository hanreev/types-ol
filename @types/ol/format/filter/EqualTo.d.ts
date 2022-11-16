import ComparisonBinary from './ComparisonBinary';

export default class EqualTo extends ComparisonBinary {
    constructor(propertyName: string, expression: string | number, matchCase?: boolean);
}
