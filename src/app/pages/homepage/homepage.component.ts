import { Component, OnInit } from '@angular/core';

/**
 * Homepage Component
 *
 * This is the main landing page component that displays:
 * - Hero section with call-to-action buttons
 * - Features section highlighting key benefits
 * - Call-to-action section for user engagement
 *
 * The component uses Tailwind CSS for styling and follows
 * modern responsive design principles.
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
