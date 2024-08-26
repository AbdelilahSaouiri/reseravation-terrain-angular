import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationRegComponent } from './verification-reg.component';

describe('VerificationRegComponent', () => {
  let component: VerificationRegComponent;
  let fixture: ComponentFixture<VerificationRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationRegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
