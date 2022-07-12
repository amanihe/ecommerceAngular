import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLigneComponent } from './order-ligne.component';

describe('OrderLigneComponent', () => {
  let component: OrderLigneComponent;
  let fixture: ComponentFixture<OrderLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
