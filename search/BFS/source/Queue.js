// define a class for the queue
// to enqueue and dequeue items (in our case Positions)
class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(item) {
    this.data.unshift(item);
  }

  dequeue(item) {
    this.data.pop();
  }

  size() {
    return this.data.length;
  }

  first() {

  }

  last() {

  }
}
