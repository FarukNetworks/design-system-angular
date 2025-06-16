import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonComponent } from './icon-button.component';

describe('IconButtonComponent', () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button type by default', () => {
    expect(component.type).toBe('button');
  });

  it('should have correct dimensions from Figma specs', () => {
    expect(component.buttonClasses).toContain('w-[30px]');
    expect(component.buttonClasses).toContain('h-[30px]');
    expect(component.buttonClasses).toContain('p-2'); // 8px padding
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    expect(component.buttonClasses).toContain('bg-grey-4');
    expect(component.buttonClasses).toContain('text-grey-5');
    expect(component.buttonClasses).toContain('cursor-not-allowed');
  });

  it('should have transparent background when not disabled', () => {
    component.disabled = false;
    expect(component.buttonClasses).toContain('bg-transparent');
  });

  it('should detect when icon is present', () => {
    component.icon = 'fas fa-chevron-left';
    expect(component.hasIcon).toBeTruthy();

    component.icon = '';
    component.iconCustom = 'chevron-left.svg';
    expect(component.hasIcon).toBeTruthy();

    component.icon = '';
    component.iconCustom = '';
    expect(component.hasIcon).toBeFalsy();
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
