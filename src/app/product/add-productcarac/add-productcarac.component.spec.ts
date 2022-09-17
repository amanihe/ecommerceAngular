import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductcaracComponent } from './add-productcarac.component';

describe('AddProductcaracComponent', () => {
  let component: AddProductcaracComponent;
  let fixture: ComponentFixture<AddProductcaracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductcaracComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductcaracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
