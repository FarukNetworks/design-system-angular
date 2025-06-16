import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationButtonComponent } from './notification-button.component';

describe('NotificationButtonComponent', () => {
  let component: NotificationButtonComponent;
  let fixture: ComponentFixture<NotificationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display number when provided', () => {
    component.number = 5;
    expect(component.hasNumber).toBeTruthy();
    expect(component.displayNumber).toBe('5');
  });

  it('should display 99+ when number exceeds 99', () => {
    component.number = 150;
    expect(component.displayNumber).toBe('99+');
  });

  it('should not display number when 0', () => {
    component.number = 0;
    expect(component.hasNumber).toBeFalsy();
  });
});
