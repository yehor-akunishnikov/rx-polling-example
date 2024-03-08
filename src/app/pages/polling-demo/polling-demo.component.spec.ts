import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingDemoComponent } from './polling-demo.component';

describe('PollingDemoComponent', () => {
  let component: PollingDemoComponent;
  let fixture: ComponentFixture<PollingDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollingDemoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollingDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
