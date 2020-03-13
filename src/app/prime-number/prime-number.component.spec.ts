import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNumberComponent } from './prime-number.component';

describe('PrimeNumberComponent', () => {
  let component: PrimeNumberComponent;
  let fixture: ComponentFixture<PrimeNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
