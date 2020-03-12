import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DijkstrasComponent } from './dijkstras.component';

describe('DijkstrasComponent', () => {
  let component: DijkstrasComponent;
  let fixture: ComponentFixture<DijkstrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DijkstrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DijkstrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
