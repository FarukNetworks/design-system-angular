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

@Component({
  selector: 'app-button-navigation',
  templateUrl: './button-navigation.component.html',
  styleUrls: ['./button-navigation.component.scss'],
})
export class ButtonNavigationComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean = false;

  // Icon library icons (Font Awesome, etc.)
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';

  // Custom SVG icons
  @Input() leftIconCustom: string = '';
  @Input() rightIconCustom: string = '';

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

    // Size classes with border radius (same as regular button)
    const sizeClasses = 'px-5 py-1.5 text-12 rounded';

    // Navigation button styling - single variant with disabled state
    const variantClasses = this.disabled
      ? 'bg-navy-1-10 text-white-40 cursor-not-allowed'
      : 'bg-white-0 hover:bg-white-10 active:bg-white-20 border border-white text-white';

    return `${baseClasses} ${sizeClasses} ${variantClasses}`;
  }

  get iconClasses(): string {
    // 12px icons (w-3 h-3) - same as regular button
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
