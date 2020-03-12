import {Node} from './Node';

export class Edge {
  id: number;
  name: string;
  start: Node;
  end: Node;
  weight: number;

  constructor(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
  }
}
