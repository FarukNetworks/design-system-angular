import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonLinkVariant = 'primary' | 'secondary';

@Component({
  selector: 'app-button-link',
  templateUrl: './button-link.component.html',
  styleUrls: ['./button-link.component.scss'],
})
export class ButtonLinkComponent {
  @Input() variant: ButtonLinkVariant = 'primary';
  @Input() disabled: boolean = false;
  @Input() href: string = '#';
  @Input() target: string = '_self';
  @Input() ariaLabel: string = '';

  @Output() linkClick = new EventEmitter<Event>();

  onClick(event: Event): void {
    if (!this.disabled) {
      this.linkClick.emit(event);
    }
  }

  get linkClasses(): string {
    const baseClasses =
      'inline-flex items-center font-semibold transition-all duration-300 underline decoration-solid decoration-auto underline-offset-auto';

    // Typography classes based on specification
    const typographyClasses = 'text-14 leading-[30px]';

    // Font family is handled by CSS variable in styles.scss
    const fontFamilyClass = 'font-source-sans-pro';

    // Variant classes
    const variantClasses = {
      primary: this.disabled
        ? 'text-grey-5 cursor-not-allowed'
        : 'text-green-1 hover:text-green-4 active:text-green-5',
      secondary: this.disabled
        ? 'text-grey-5 cursor-not-allowed'
        : 'text-navy-3 hover:text-navy-4 active:text-navy-5',
    };

    return `${baseClasses} ${typographyClasses} ${fontFamilyClass} ${
      variantClasses[this.variant]
    }`;
  }
}
