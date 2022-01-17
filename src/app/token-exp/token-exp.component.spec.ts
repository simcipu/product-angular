import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenExpComponent } from './token-exp.component';

describe('TokenExpComponent', () => {
  let component: TokenExpComponent;
  let fixture: ComponentFixture<TokenExpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenExpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
