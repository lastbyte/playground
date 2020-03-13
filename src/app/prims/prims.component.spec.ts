import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimsComponent } from './prims.component';

describe('PrimsComponent', () => {
  let component: PrimsComponent;
  let fixture: ComponentFixture<PrimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
