import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { ModalComponent } from '../modal/modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { ButtonPainelComponent } from '../button-painel/button-painel.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, ModalComponent, DragDropModule, FilterPipe, ButtonPainelComponent, TaskFormComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() tasks!: any;
  @Input() status!: any;
  @Input() view!: string;
  @Input() textSearch!: string;
  @Output() deleteTaskEvent = new EventEmitter<string>();

  taskToDelete: { id: number; title: string } = {
    id: 0,
    title: '',
  };

  editTaskForm: FormGroup;
  showFormEditTask: boolean = false;
  modalOpen: boolean = false;

  constructor(private _eref: ElementRef, private fb: FormBuilder) {
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }); 
  }

  togglePainelVisibility(i: number) {
    this.tasks.map((item: { showPainel: boolean; }) => item.showPainel = false);
    this.tasks[i].showPainel = !this.tasks.showPainel;
  }

  onDivClick() {
    event!.stopPropagation();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.tasks.map((item: { showPainel: boolean; }) => item.showPainel = false);
    }
  }

  openModal(i: number) {
    this.modalOpen = true;
    this.tasks[i].showPainel = false;
    this.taskToDelete.title = this.tasks[i].title;
    this.taskToDelete.id = this.tasks[i].id;
  }

  closeModal() {
    this.modalOpen = false;
  }

  deleteTask() {
    let index = this.tasks.findIndex((item: { id: number; }) => item.id === this.taskToDelete.id);
    this.tasks.splice(index, 1);
    this.modalOpen = false;
  }

  editTask(i: number) {
    this.tasks[i].title = this.editTaskForm.get('title')?.value;
    this.tasks[i].description = this.editTaskForm.get('description')?.value;
    
    this.editTaskForm.setValue({
      title:  null,
      description:  null
    });

    this.tasks[i].showEditFrom = false;
  }

  openEditTask(i: number) {
    this.tasks.map((item: { showEditFrom: boolean; }) => item.showEditFrom = false);
    // const titleValue = this.editTaskForm.get('title')?.value;
    // const descriptionValue = this.editTaskForm.get('description')?.value;

    this.tasks[i].showEditFrom = !this.tasks[i].showEditFrom;
    this.tasks[i].showPainel = false;

    // this.editTaskForm.title = this.tasks[i].title;
    // this.editTaskForm.description = this.tasks[i].description;

    this.editTaskForm.setValue({
      title:  this.tasks[i].title,
      description:  this.tasks[i].description
    });
  }

}