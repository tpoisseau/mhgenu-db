export default class Sequence {
  constructor(start=0, step=1) {
    this.start = start;
    this.current = start;
    this.step = step;
  }
  
  next() {
    const {current} = this;
    
    this.current += this.step;
    
    return current;
  }
  
  reset() {
    this.current = this.start;
  }
}