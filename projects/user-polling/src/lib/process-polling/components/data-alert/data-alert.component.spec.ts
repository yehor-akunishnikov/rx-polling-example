import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAlertComponent } from './data-alert.component';

describe('DataAlertComponent', () => {
  let component: DataAlertComponent;
  let fixture: ComponentFixture<DataAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
