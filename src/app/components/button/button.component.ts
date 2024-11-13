import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() link: string|undefined = undefined;
  @Input() type: string = '';
  @Input() nativeType: string = 'button';
  @Input() disabled: boolean = false;

  isLinkExternal() {
    return this.link && (this.link.startsWith('http') || this.link.startsWith('https'));
  }

  handleTypes(types: string) {
    return types.split(' ').map((type: string) => `is-${type}`).join(' ');
  }
}
