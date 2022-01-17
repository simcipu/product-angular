import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaProductComponent } from './cerca-product.component';

describe('CercaProductComponent', () => {
  let component: CercaProductComponent;
  let fixture: ComponentFixture<CercaProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CercaProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CercaProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
