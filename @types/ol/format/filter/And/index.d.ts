declare module 'ol/format/filter/And' {

  import LogicalNary from 'ol/format/filter/LogicalNary';
  import Filter from 'ol/format/filter/Filter';

  export default class And extends LogicalNary {
    constructor(...conditions: Filter[]);
  }

}
