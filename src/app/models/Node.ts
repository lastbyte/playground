import { Edge } from './Edge';
export class Node {
  public id: number;
  public name: string;
  public distanceFromStart: number;
  public x: number;
  public y: number;
  public edges: Edge[];

  constructor(x, y, pos) {
    this.x = x;
    this.y = y;
    this.id = pos;
    this.name = String(pos);
    this.distanceFromStart = Infinity;
  }
}
