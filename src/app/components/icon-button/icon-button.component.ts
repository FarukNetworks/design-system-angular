import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconService } from '../../shared/services/icon.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type IconButtonVariant = 'default' | 'stroke';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit, OnDestroy {
  @Input() variant: IconButtonVariant = 'default';
  @Input() disabled: boolean = false;

  // Icon library icons (Font Awesome, etc.)
  @Input() icon: string = '';

  // Custom SVG icons
  @Input() iconCustom: string = '';

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel: string = '';

  @Output() buttonClick = new EventEmitter<Event>();

  // SVG content for custom icon
  iconSvg: SafeHtml = '';

  private destroy$ = new Subject<void>();

  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadCustomIcon();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCustomIcon(): void {
    if (this.iconCustom) {
      this.iconService
        .loadIcon(this.iconCustom)
        .pipe(takeUntil(this.destroy$))
        .subscribe((svgContent) => {
          this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(svgContent);
        });
    }
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get buttonClasses(): string {
    // Exact Figma specifications
    const baseClasses =
      'flex justify-center items-center flex-shrink-0 transition-all duration-300';

    // Fixed dimensions and spacing from Figma
    const sizeClasses = 'w-[30px] h-[30px]';

    // Border radius for rounded appearance
    const shapeClasses = 'rounded';

    // Variant-based styling
    let variantClasses: string;

    if (this.disabled) {
      // Disabled state (same for both variants)
      variantClasses = 'bg-navy-1-10 text-grey-5 cursor-not-allowed';
    } else if (this.variant === 'stroke') {
      // Stroke variant - border with transparent background
      variantClasses =
        'border border-navy-3 text-navy-3 hover:bg-navy-1-5 hover:border-navy-4 hover:text-navy-4 active:bg-navy-1-5 active:border-navy-5 active:text-navy-5 bg-transparent';
    } else {
      // Default variant - no border, transparent background
      variantClasses =
        'bg-transparent text-navy-3 hover:bg-navy-1-5 hover:text-navy-4 active:text-navy-5';
    }

    return `${baseClasses} ${sizeClasses} ${shapeClasses} ${variantClasses}`;
  }

  get iconClasses(): string {
    // Icon sizing to fit within 30px container with 8px padding
    return 'w-[15px] h-[15px] text-current relative left-[-1px] top-[-1px]';
  }

  get hasIcon(): boolean {
    return !!(this.icon || this.iconCustom);
  }
}
