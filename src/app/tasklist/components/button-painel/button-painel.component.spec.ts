import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPainelComponent } from './button-painel.component';

describe('ButtonPainelComponent', () => {
  let component: ButtonPainelComponent;
  let fixture: ComponentFixture<ButtonPainelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPainelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
