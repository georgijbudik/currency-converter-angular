import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor() {}
  @Input() USD = 0.0;
  @Input() EUR = 0.0;
}
