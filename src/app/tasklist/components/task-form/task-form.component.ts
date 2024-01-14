import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';
import { AutoResizeDirective } from '../../../directives/auto-resize.directive';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, AutoResizeDirective],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  @Input() formGroup!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();
  @Output() formCancel = new EventEmitter<void>();


  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.formSubmit.emit();
  }

  resetForm() {
    this.formGroup.reset();
    this.formCancel.emit();
  }
}
