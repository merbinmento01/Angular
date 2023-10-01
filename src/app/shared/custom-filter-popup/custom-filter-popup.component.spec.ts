import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterPopupComponent } from './custom-filter-popup.component';

describe('CustomFilterPopupComponent', () => {
  let component: CustomFilterPopupComponent;
  let fixture: ComponentFixture<CustomFilterPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFilterPopupComponent]
    });
    fixture = TestBed.createComponent(CustomFilterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
