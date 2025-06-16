import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  private iconCache = new Map<string, string>();

  constructor(private http: HttpClient) {}

  /**
   * Load SVG icon content from assets
   * @param iconFileName - Full filename of the icon (e.g., 'icon=duplicate.svg')
   * @returns Observable<string> - SVG content as string
   */
  loadIcon(iconFileName: string): Observable<string> {
    // Check cache first
    if (this.iconCache.has(iconFileName)) {
      return of(this.iconCache.get(iconFileName)!);
    }

    // Load from assets using full filename
    const iconPath = `assets/icons/${iconFileName}`;

    return this.http.get(iconPath, { responseType: 'text' }).pipe(
      map((svgContent: string) => {
        // Modify SVG to use currentColor for proper color inheritance
        const modifiedSvg = this.modifySvgForColorInheritance(svgContent);

        // Cache the modified content
        this.iconCache.set(iconFileName, modifiedSvg);
        return modifiedSvg;
      }),
      catchError((error) => {
        console.warn(`Icon '${iconFileName}' not found at ${iconPath}`, error);
        return of('');
      })
    );
  }

  /**
   * Modify SVG content to inherit text color
   * @param svgContent - Original SVG content
   * @returns string - Modified SVG content with currentColor
   */
  private modifySvgForColorInheritance(svgContent: string): string {
    // Replace fixed fill colors with currentColor to inherit text color
    return (
      svgContent
        .replace(/fill="#[^"]*"/g, 'fill="currentColor"')
        .replace(/fill='#[^']*'/g, "fill='currentColor'")
        // Also handle stroke colors if present
        .replace(/stroke="#[^"]*"/g, 'stroke="currentColor"')
        .replace(/stroke='#[^']*'/g, "stroke='currentColor'")
    );
  }

  /**
   * Get cached icon content synchronously
   * @param iconFileName - Full filename of the icon
   * @returns string - SVG content or empty string if not cached
   */
  getCachedIcon(iconFileName: string): string {
    return this.iconCache.get(iconFileName) || '';
  }

  /**
   * Preload multiple icons
   * @param iconFileNames - Array of icon filenames to preload
   */
  preloadIcons(iconFileNames: string[]): void {
    iconFileNames.forEach((iconFileName) => {
      this.loadIcon(iconFileName).subscribe();
    });
  }

  /**
   * Check if an icon name refers to a custom SVG (starts with @/)
   * @param iconName - Icon name to check
   * @returns boolean
   */
  isCustomIcon(iconName: string): boolean {
    return iconName.startsWith('@/icons/');
  }

  /**
   * Extract icon name from custom icon path
   * @param iconPath - Full icon path (e.g., '@/icons/plus')
   * @returns string - Icon name (e.g., 'plus')
   */
  extractIconName(iconPath: string): string {
    if (this.isCustomIcon(iconPath)) {
      return iconPath.replace('@/icons/', '');
    }
    return iconPath;
  }
}
