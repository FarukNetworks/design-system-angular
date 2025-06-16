import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonNavigationComponent } from './button-navigation.component';

describe('ButtonNavigationComponent', () => {
  let component: ButtonNavigationComponent;
  let fixture: ComponentFixture<ButtonNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button type by default', () => {
    expect(component.type).toBe('button');
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    expect(component.buttonClasses).toContain('bg-navy-1-10');
    expect(component.buttonClasses).toContain('text-grey-5');
    expect(component.buttonClasses).toContain('cursor-not-allowed');
  });

  it('should have navy styling when not disabled', () => {
    component.disabled = false;
    expect(component.buttonClasses).toContain('bg-navy-1');
    expect(component.buttonClasses).toContain('text-white');
  });

  it('should emit buttonClick when clicked and not disabled', () => {
    spyOn(component.buttonClick, 'emit');
    const event = new Event('click');

    component.disabled = false;
    component.onClick(event);

    expect(component.buttonClick.emit).toHaveBeenCalledWith(event);
  });

  it('should not emit buttonClick when disabled', () => {
    spyOn(component.buttonClick, 'emit');
    const event = new Event('click');

    component.disabled = true;
    component.onClick(event);

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });
});
