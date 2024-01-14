import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BoardSection } from '../../../models/tasks.model';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-section-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
  templateUrl: './section-form.component.html',
  styleUrl: './section-form.component.scss'
})
export class SectionFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() showForm: boolean = false;
  @Input() type: string = "new";
  @Input() editedSectionName!: string ;
  
  @Output() formSubmit = new EventEmitter<void>();
  @Output() formToggle = new EventEmitter<void>();
  sectionTasks: BoardSection[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      sectionName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.sectionTasks = JSON.parse(storedTasks);
    }
  }

  checkIfTitleExists() {
    this.form.get('sectionName')?.setErrors(null);
    if (this.sectionTasks.some(section => section.status === (this.form.get('sectionName')?.value.toLowerCase()) && (this.form.get('sectionName')?.value.toLowerCase()) !== this.editedSectionName.toLowerCase())) {
      this.form.get('sectionName')?.setErrors({ nameExists: true });
    }
  }
}
