import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotModalPage } from './parking-lot-modal.page';

describe('ParkingLotModalPage', () => {
  let component: ParkingLotModalPage;
  let fixture: ComponentFixture<ParkingLotModalPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLotModalPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
