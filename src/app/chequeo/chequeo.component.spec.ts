import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeoComponent } from './chequeo.component';

describe('ChequeoComponent', () => {
  let component: ChequeoComponent;
  let fixture: ComponentFixture<ChequeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
