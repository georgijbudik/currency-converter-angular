import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header
      class="flex justify-center h-16 p-4 items-center bg-blue-500 text-gray-100 rounded-md"
    >
      <div class="flex items-center">
        <h1 class="mr-5 text-xl font-bold">Current exchange rates -</h1>
        <div class="flex space-x-2">
          <p class="mr-2 font-semibold text-2xl">USD: {{ USD }}</p>
          <p class="font-semibold text-2xl">EUR: {{ EUR }}</p>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  constructor() {}
  @Input() USD = 0.0;
  @Input() EUR = 0.0;
}
