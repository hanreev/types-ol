import Comparison from './Comparison';

/**
 * [constructor description]
 */
export default class IsLike extends Comparison {
    constructor(
        propertyName: string,
        pattern: string,
        wildCard?: string,
        singleChar?: string,
        escapeChar?: string,
        matchCase?: boolean,
    );
}
