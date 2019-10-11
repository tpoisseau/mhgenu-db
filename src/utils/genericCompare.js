export default function generic_compare(a, b) {
  if (typeof a === 'string') {
    return a.localeCompare(b); // let assume that b is a string to.
  }
  
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
}