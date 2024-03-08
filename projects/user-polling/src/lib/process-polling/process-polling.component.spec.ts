import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPollingComponent } from './process-polling.component';

describe('ProcessPollingComponent', () => {
  let component: ProcessPollingComponent;
  let fixture: ComponentFixture<ProcessPollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessPollingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
