import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateutentiComponent } from './updateutenti.component';

describe('UpdateutentiComponent', () => {
  let component: UpdateutentiComponent;
  let fixture: ComponentFixture<UpdateutentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateutentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateutentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
