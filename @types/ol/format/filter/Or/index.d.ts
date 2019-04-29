declare module 'ol/format/filter/Or' {

  import LogicalNary from 'ol/format/filter/LogicalNary';
  import Filter from 'ol/format/filter/Filter';

  export default class Or extends LogicalNary {
    constructor(...conditions: Filter[]);
  }

}
