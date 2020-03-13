import {Component, OnInit, ViewChild} from '@angular/core';
import * as p5 from 'p5';
import {range} from 'rxjs';
@Component({
  selector: 'app-prime-number',
  templateUrl: './prime-number.component.html',
  styleUrls: ['./prime-number.component.css']
})
export class PrimeNumberComponent implements OnInit {

  private canvas: p5;

  private start: number;

  private end: number;

  private primes: number[];

  private scalingFactor: number;

  public includeComposite: boolean;

  @ViewChild('canvas') canvasHolder;

  constructor() {
    this.start = 1;
    this.end = 100;
    this.primes = [];
    this.includeComposite = false;
  }

  ngOnInit(): void {

    const sketch = s => {

      s.setup = () => {
        const canvas = s.createCanvas(this.canvasHolder.nativeElement.offsetWidth, this.canvasHolder.nativeElement.offsetHeight);
        canvas.parent('canvas');
        s.translate(this.canvasHolder.nativeElement.offsetWidth / 2, this.canvasHolder.nativeElement.offsetHeight / 2);
        s.stroke('green');
        s.strokeWeight(2);
        s.point(0, 0)
        s.stroke('green');
        s.strokeWeight(2);
        for ( let i = 1; i < this.end ; i += 1) {
          console.log('plotting num : ' + i)
          if (this.isPrime(i)) {
            s.stroke('green');
            s.point( (i * s.cos(i)) * (1 / this.scalingFactor) , ( i * s.sin(i)) * (1 / this.scalingFactor) );
          } else if (this.includeComposite) {
            s.stroke('yellow');
            s.point( (i * s.cos(i)) * (1 / this.scalingFactor) , ( i * s.sin(i)) * (1 / this.scalingFactor) );
          }
        }
      };
      s.draw = () => {

      }
    };
    this.canvas = new p5(sketch);
  }

  isPrime = (n) => {
    if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) { return false; }
    if (n === this.leastFactor(n)) { return true; }
    return false;
  }

// leastFactor(n)
// returns the smallest prime that divides n
//     NaN if n is NaN or Infinity
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer

  leastFactor = (n) => {
    if (isNaN(n) || !isFinite(n)) { return NaN; }
    if (n === 0) { return 0; }
    if (n % 1 || n * n < 2) { return 1; }
    if (n % 2 === 0) { return 2; }
    if (n % 3 === 0) { return 3; }
    if (n % 5 === 0) { return 5; }
    const m = Math.sqrt(n);
    for (let i = 7; i <= m; i += 30) {
      if (n % i === 0) {      return i; }
      if (n % (i + 4) === 0) {  return i + 4; }
      if (n % (i + 6) === 0) {  return i + 6; }
      if (n % (i + 10) === 0) { return i + 10; }
      if (n % (i + 12) === 0) { return i + 12; }
      if (n % (i + 16) === 0) { return i + 16; }
      if (n % (i + 22) === 0) { return i + 22; }
      if (n % (i + 24) === 0) { return i + 24; }
    }
    return n;
  }

  updateMaxNumber(value: string) {
    this.end = Number(value);
  }

  updateScalingFactor(value: string) {
    this.scalingFactor = Number(value);
  }

  visualize() {
    this.canvas.setup();
  }

  updateIncludeComposite(value: string) {
    if ( value === 'Y' || value === 'y' ) {
      this.includeComposite = false;
    } else {
      this.includeComposite = true;
    }
  }

}
