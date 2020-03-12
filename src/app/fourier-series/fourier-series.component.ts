import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-fourier-series',
  templateUrl: './fourier-series.component.html',
  styleUrls: ['./fourier-series.component.css']
})
export class FourierSeriesComponent implements OnInit {
  private canvas: p5;
  private Y;

  @ViewChild('canvas') canvasHolder: ElementRef;

  @Input() numCircle: number;

  time: number;

  @Input() speed: number;

  constructor(private route: ActivatedRoute) {
    this.Y = [];
    this.time = 0;
    this.numCircle = 3;
    this.speed = 0.01;

  }

  updateSpeed(speed): void {
    this.speed = speed / 100;
  }

  updateNumCircle(numCircle): void {
    this.numCircle = numCircle;
  }

  ngOnInit(): void {
    const sketch = s => {
      s.setup = () => {
        const canvas = s.createCanvas(this.canvasHolder.nativeElement.offsetWidth, this.canvasHolder.nativeElement.offsetHeight);
        canvas.parent('canvas');
        s.background(0);
      };
      s.draw = () => {
        s.translate(300, 300);
        s.background(0);
        let x1 = 0;
        let y1 = 0;
        for (let i = 0; i < this.numCircle; i++) {
          const x2 = x1;
          const y2 = y1;
          const multiplier = 2 * i + 1;
          const radius = 100;
          const constant = 4 / (multiplier * s.PI);
          x1 += radius * constant * s.cos(multiplier * this.time);
          y1 += radius * constant * s.sin(multiplier * this.time);

          s.stroke(255, 100);
          if (i === 0) {
            s.strokeWeight(4);
          } else {
            s.strokeWeight(2);
          }
          s.noFill();
          s.ellipse( x2 , y2 , radius * constant * 2 );
          s.stroke( 255 , 100 );
          s.line(x2 , y2 , x1 , y1 );
        }
        if (this.Y.length > 500) {
          this.Y.pop();
        }
        this.Y.unshift(y1)
        s.line(x1 , y1 , 200 , this.Y[0] );
        s.translate(200, 0 );
        s.strokeWeight(4)
        s.beginShape()
        for (let i = 0; i < this.Y.length; i++ ) {
          s.vertex(i, this.Y[i] );
        }
        s.endShape();
        this.time += this.speed;
      };
    }
    this.canvas = new p5(sketch);
  }

}
