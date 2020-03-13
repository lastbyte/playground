import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {Edge} from '../models/Edge';
import {Node} from '../models/Node';

@Component({
  selector: 'app-prims',
  templateUrl: './prims.component.html',
  styleUrls: ['./prims.component.css']
})
export class PrimsComponent implements OnInit {

  private canvas: p5;
  private edges: Map<number, Edge[]>;
  private minimumSpanningTree: Edge[];
  public nodes: Node[];
  public gridSize: number;
  public gridWidth: number;

  backgroud = 200;
  gridColor = 255;
  pointColor = 'green';
  nonVisitedEdge = 'red';
  visitedEdge = 'yellow';

  @ViewChild('canvas') canvasHolder: ElementRef;

  constructor() {
    this.nodes = [];
    this.minimumSpanningTree = []
    this.edges = new Map<number, Edge[]>();
    this.gridWidth = 20;
    this.gridSize = 30;
  }

  private drawGrid  = (s: any, size, width) =>  {
    console.log('grid size : ' + size + ' , grid width : ' + width   );
    s.stroke(this.gridColor);
    s.background(this.backgroud);
    let counter = 0;
    for ( let i = 0 ; counter <= size ; i += width) {
      s.strokeWeight(1);
      s.line(i, 0, i, width * size);
      counter += 1;
    }
    counter = 0;
    for (let i = 0; counter <= size; i += width) {
      s.strokeWeight(1);
      s.line(0, i, size * width, i);
      counter += 1;
    }
  }

  private drawPoints(s: any) {
    this.nodes.forEach( node => {
      s.stroke(this.pointColor);
      s.strokeWeight(10);
      s.point(node.x, node.y);
      s.stroke(0, 0, 0, 0);
      s.text(node.id, node.x - 10, node.y - 10);
    });
  }

  private drawEdges(s: any) {
    s.strokeWeight(5);
    let i = 0;
    while (i < this.nodes.length ) {
      const lst = this.edges.get(i);
      if ( lst != null && lst.length > 0) {
        lst.forEach( e => {
          s.stroke(this.nonVisitedEdge);
          this.line(e.start, e.end);
          s.stroke(0, 0, 0, 0);
          s.text(e.weight, (e.start.x + e.end.x) / 2, (e.start.y + e.end.y) / 2);
        });
      }
      i++;
    }
  }

  private line(startNode: Node, endNode: Node) {
    this.canvas.line(startNode.x, startNode.y, endNode.x, endNode.y);
  }

  private drawPath(edges: Edge[]) {
    edges.forEach( edge => {
      this.canvas.stroke(this.visitedEdge);
      this.canvas.strokeWeight(5);
      this.canvas.line(edge.start.x, edge.start.y, edge.end.x, edge.end.y );
    });
  }

  ngOnInit(): void {
    const sketch = s => {
      s.setup = () => {
        const canvas = s.createCanvas(this.canvasHolder.nativeElement.offsetWidth, this.canvasHolder.nativeElement.offsetHeight);
        canvas.parent('canvas');
        this.drawGrid(s, this.gridSize, this.gridWidth);
        this.drawPoints(s);
        this.drawEdges(s);
        s.noLoop();
      };
      s.draw = () => {
      };
    };
    this.canvas = new p5(sketch);
  }

  updateGridWidth(value) {
    this.gridWidth = Number(value);
    this.canvas.setup();
  }

  updateGridSize(value) {
    this.gridSize = Number(value);
    this.canvas.setup();
  }

  addEdge(input: string) {
    const vals = input.split(',');
    const start = Number(vals[0]);
    const end = Number(vals[1]);
    const weight = Number(vals[2]);
    console.log('clicked');
    const edge: Edge = new Edge(this.nodes[start], this.nodes[end], weight);
    const oppEdge: Edge = new Edge(this.nodes[end], this.nodes[start], weight);
    this._addEdge(start, edge);
    this._addEdge(end, oppEdge);
    this.canvas.setup();
  }

  private _addEdge(start, edge: Edge) {
    let exists = false;
    if (this.edges.get(start) == null) {
      this.edges.set(start, [edge]);
      console.log('edge added');
    } else {
      this.edges.get(start).forEach(e => {
        if (edge.end.id === e.end.id) {
          exists = true;
        }
      });
      if (!exists) {
        this.edges.get(start).push(edge);
        console.log('edge added');
      } else {
        console.log('edge not added');
      }
    }
  }

  addNode() {
    console.log('mouse clicked');
    const x = this.canvas.mouseX;
    const y = this.canvas.mouseY;
    console.log('x : ' + x + ' y : ' + y);
    const node = new Node(x, y, this.nodes.length);
    this.nodes.push(node);
    this.canvas.setup();
  }

  calculateMST() {
    this.minimumSpanningTree = [];
    this.primsMST();
    this.drawPath(this.minimumSpanningTree);
  }
  primsMST() {

    const edgesQueue = [];

    const visitedVertices = {};

    this.nodes.forEach( node => {
      visitedVertices[node.id] = false;
    });


    const startVertex: Node = this.nodes[0];

    visitedVertices[startVertex.id] = true;

    this.edges.get(startVertex.id).forEach( edge => {
      edgesQueue.push(edge);
    });

    let minEdgeIndex = this.getMinIndex(edgesQueue, visitedVertices);
    let tmp = edgesQueue[minEdgeIndex];
    edgesQueue[minEdgeIndex] = edgesQueue[edgesQueue.length - 1]
    edgesQueue[edgesQueue.length - 1] = tmp ;

    // Now let's explore all queued edges.
    while (this.minimumSpanningTree.length < this.nodes.length - 1) {
      const currentMinEdge = edgesQueue.pop();

      // Find out the next unvisited minimal vertex to traverse.
      let nextMinVertex = null;
      if (!visitedVertices[currentMinEdge.start.id]) {
        nextMinVertex = currentMinEdge.start;
      } else if (!visitedVertices[currentMinEdge.end.id]) {
        nextMinVertex = currentMinEdge.end;
      }

      // If all vertices of current edge has been already visited then skip this round.
      if (nextMinVertex) {
        // Add current min edge to MST.
        this.minimumSpanningTree.push(currentMinEdge);
        visitedVertices[nextMinVertex.id] = true;
        // Add all current vertex's edges to the queue.
        if (this.edges.get(nextMinVertex.id) != null && this.edges.get(nextMinVertex.id).length > 0) {
          this.edges.get(nextMinVertex.id).forEach(edge => {
            if (!visitedVertices[edge.start.id] || !visitedVertices[edge.end.id]) {
              edgesQueue.push(edge);
            }
          });
        }
        // Add vertex to the set of visited ones.
        minEdgeIndex = this.getMinIndex(edgesQueue, visitedVertices);
        tmp = edgesQueue[minEdgeIndex];
        edgesQueue[minEdgeIndex] = edgesQueue[edgesQueue.length - 1]
        edgesQueue[edgesQueue.length - 1] = tmp ;
      }
    }
  }

  private getMinIndex(edgesQueue: any[], visitedVertices) {
    let minIndex = -1;
    let min = Infinity;

    edgesQueue.forEach( e => {
      if ( (!visitedVertices[e.start.id] || !visitedVertices[e.end.id]) && (e.weight < min) ) {
        min = e.weight;
        minIndex = edgesQueue.indexOf(e);
      }
    });

    return minIndex;
  }



  testPrim() {
    this.nodes.push(new Node(50, 200, 0));
    this.nodes.push(new Node(150, 100, 1));
    this.nodes.push(new Node(250, 100, 2));
    this.nodes.push(new Node(350, 100, 3));
    this.nodes.push(new Node(450, 200, 4));
    this.nodes.push(new Node(350, 300, 5));
    this.nodes.push(new Node(250, 300, 6));
    this.nodes.push(new Node(150, 300, 7));
    this.nodes.push(new Node(250, 200, 8));

    this.addEdge('0,1,4');
    this.addEdge('1,2,8');
    this.addEdge('2,3,7');
    this.addEdge('3,4,9');
    this.addEdge('4,5,10');
    this.addEdge('5,6,2');
    this.addEdge('6,7,1');
    this.addEdge('7,0,8');
    this.addEdge('7,8,7');
    this.addEdge('7,1,11');
    this.addEdge('2,8,2');
    this.addEdge('6,8,6');
    this.addEdge('2,5,4');
    this.addEdge('5,3,14');

    this.canvas.setup();
  }
}
