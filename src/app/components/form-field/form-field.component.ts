import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;

  @Output() valueChange = new EventEmitter<string>(); // Emits value back to LoginComponent

  onValueChange(newValue: string) {
    this.valueChange.emit(newValue); // Emit changes
  }
}
