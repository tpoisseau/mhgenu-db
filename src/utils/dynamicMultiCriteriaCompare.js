import genericCompare from "./genericCompare";

/**
 * @typedef IDynamicColumn
 * @property {string} fieldName
 * @property {number} priority
 * @property {boolean} isSortedDescending
 */

/**
 * The object MUST have a property of IDynamicColumn.fieldName
 * @typedef IDynamicItem object
 */

/**
 * @param {IDynamicColumn[]} orders
 * @param {IDynamicItem} a
 * @param {IDynamicItem} b
 * @returns {number}
 */
function dynamicMultiCriteriaCompare(orders, a, b) { // assume orders is sorted by priority
  for (const {fieldName: key, isSortedDescending} of orders) {
    const [av, bv] = [a[key], b[key]];
    
    const compare = isSortedDescending ? genericCompare(bv, av) : genericCompare(av, bv);
    
    if (compare !== 0) return compare;
  }
  
  return 0;
}

/**
 * @param {IDynamicColumn[]} orders
 * @param {boolean} [asc] - if not specified, you MUST order columns, the comparator function returned is based upon the column order
 * if you specified
 * @param {string} [key] - if you specified a sort direction, you SHOULD provide a key for sort your orders, key is `'priority'` by default
 * @returns {function(IDynamicItem, IDynamicItem): number}
 */
function factoryDynamicMultiCriteriaComparator(orders, asc, key='priority') {
  orders = orders.slice();
  
  if (typeof asc === 'boolean') {
    orders.sort(asc
      ? ({[key]: a}, {[key]: b}) => genericCompare(a, b)
      : ({[key]: a}, {[key]: b}) => genericCompare(b, a)
    );
  }
  
  return (a, b) => dynamicMultiCriteriaCompare(orders, a, b);
}

export {
  dynamicMultiCriteriaCompare,
  factoryDynamicMultiCriteriaComparator,
}

export default factoryDynamicMultiCriteriaComparator;