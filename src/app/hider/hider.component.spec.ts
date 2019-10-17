import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiderComponent } from './hider.component';

describe('HiderComponent', () => {
  let component: HiderComponent;
  let fixture: ComponentFixture<HiderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
