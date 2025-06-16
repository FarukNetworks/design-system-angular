import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLinkNotificationComponent } from './button-link-notification.component';

describe('ButtonLinkNotificationComponent', () => {
  let component: ButtonLinkNotificationComponent;
  let fixture: ComponentFixture<ButtonLinkNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonLinkNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonLinkNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have primary variant by default', () => {
    expect(component.variant).toBe('primary');
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    expect(component.linkClasses).toContain('text-grey-5');
    expect(component.linkClasses).toContain('cursor-not-allowed');
  });

  it('should have orange base color when not disabled', () => {
    component.disabled = false;
    expect(component.linkClasses).toContain('text-orange-5');
  });
});
