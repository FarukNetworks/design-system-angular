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
  selector: 'app-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.scss'],
})
export class NotificationButtonComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() number: number = 0;
  @Input() ariaLabel: string = '';

  @Output() buttonClick = new EventEmitter<Event>();

  // SVG content for notification icon
  notificationIconSvg: SafeHtml = '';

  private destroy$ = new Subject<void>();

  constructor(
    private iconService: IconService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadNotificationIcon();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadNotificationIcon(): void {
    this.iconService
      .loadIcon('notification.svg')
      .pipe(takeUntil(this.destroy$))
      .subscribe((svgContent) => {
        this.notificationIconSvg =
          this.sanitizer.bypassSecurityTrustHtml(svgContent);
      });
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }

  get buttonClasses(): string {
    const baseClasses =
      'flex gap-[8px] items-center justify-center font-semibold transition-all duration-300';

    // Size classes with 4px border radius (same as regular button)
    const sizeClasses = 'px-5 py-1.5 text-12 rounded';

    // Notification button styling with variants based on state
    let variantClasses: string;

    if (this.disabled) {
      // Disabled state
      variantClasses = 'bg-navy-1-10 text-grey-5 cursor-not-allowed';
    } else if (this.hasNumber) {
      // Has notifications (number > 0) - active orange styling
      variantClasses =
        'bg-orange-5 hover:bg-orange-4 active:bg-orange-3 text-white';
    } else {
      // No notifications (number = 0) - inactive gray styling
      variantClasses =
        'bg-transparent border border-navy-3 text-navy-3 hover:bg-navy-1-5 hover:border-navy-4 hover:text-navy-4 active:bg-navy-1-5 active:border-navy-5 active:text-navy-5';
    }

    return `${baseClasses} ${sizeClasses} ${variantClasses}`;
  }

  get iconClasses(): string {
    return 'customIcon w-[13px] h-[12px] text-current';
  }

  get displayNumber(): string {
    if (this.number > 99) {
      return '99+';
    }
    return this.number.toString();
  }

  get hasNumber(): boolean {
    return this.number > 0;
  }
}
