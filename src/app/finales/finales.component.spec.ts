import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalesComponent } from './finales.component';

describe('FinalesComponent', () => {
  let component: FinalesComponent;
  let fixture: ComponentFixture<FinalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
