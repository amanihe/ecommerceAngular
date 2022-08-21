import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductdetailsComponent } from './add-productdetails.component';

describe('AddProductdetailsComponent', () => {
  let component: AddProductdetailsComponent;
  let fixture: ComponentFixture<AddProductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
