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

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'primary-stroke'
  | 'secondary-stroke';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnDestroy {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled: boolean = false;

  // Icon library icons (Font Awesome, etc.)
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';

  // Custom SVG icons
  @Input() leftIconCustom: string = '';
  @Input() rightIconCustom: string = '';

  @Input() link: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel: string = '';

  @Output() buttonClick = new EventEmitter<Event>();

  // SVG content for custom icons
  leftIconSvg: SafeHtml = '';
  rightIconSvg: SafeHtml = '';

  private destroy$ = new Subject<void>();

  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadCustomIcons();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCustomIcons(): void {
    // Load left custom SVG icon
    if (this.leftIconCustom) {
      this.iconService
        .loadIcon(this.leftIconCustom)
        .pipe(takeUntil(this.destroy$))
        .subscribe((svgContent) => {
          this.leftIconSvg = this.sanitizer.bypassSecurityTrustHtml(svgContent);
        });
    }

    // Load right custom SVG icon
    if (this.rightIconCustom) {
      this.iconService
        .loadIcon(this.rightIconCustom)
        .pipe(takeUntil(this.destroy$))
        .subscribe((svgContent) => {
          this.rightIconSvg =
            this.sanitizer.bypassSecurityTrustHtml(svgContent);
        });
    }
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get buttonClasses(): string {
    const baseClasses =
      'flex gap-[8px] items-center justify-center font-semibold transition-all duration-300';

    // Size classes with 4px border radius
    const sizeClasses = 'px-5 py-1.5 text-12 rounded';

    // Variant classes
    const variantClasses = {
      primary: this.disabled
        ? 'bg-navy-1-10 text-grey-5 cursor-not-allowed'
        : 'bg-green-1 hover:bg-green-4 active:bg-green-5 text-white',
      secondary: this.disabled
        ? 'bg-navy-1-10 text-grey-5 cursor-not-allowed'
        : 'bg-navy-3 hover:bg-navy-4 active:bg-navy-5 text-white',
      'primary-stroke': this.disabled
        ? 'bg-navy-1-10 text-grey-5 cursor-not-allowed'
        : 'border border-green-1 text-green-1 hover:bg-navy-1-5 hover:border-green-4 hover:text-green-4 active:bg-navy-1-5 active:border-green-5 active:text-green-5 bg-transparent',
      'secondary-stroke': this.disabled
        ? 'bg-navy-1-10 text-grey-5 cursor-not-allowed'
        : 'border border-navy-3 text-navy-3 hover:bg-navy-1-5 active:bg-navy-1-5 hover:border-navy-4 hover:text-navy-4 active:border-navy-5 active:text-navy-5 bg-transparent',
    };

    return `${baseClasses} ${sizeClasses} ${variantClasses[this.variant]}`;
  }

  get iconClasses(): string {
    // 12px icons (w-3 h-3)
    return 'customIcon';
  }

  // Helper methods for template
  hasLeftIcon(): boolean {
    return !!(this.leftIcon || this.leftIconCustom);
  }

  hasRightIcon(): boolean {
    return !!(this.rightIcon || this.rightIconCustom);
  }
}
