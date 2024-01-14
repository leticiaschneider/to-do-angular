import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { ButtonPainelComponent } from '../button-painel/button-painel.component';
import { ModalComponent } from '../modal/modal.component';
import { SectionFormComponent } from '../section-form/section-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, IconComponent, ButtonPainelComponent, ModalComponent, SectionFormComponent],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss'
})
export class SectionComponent {
  @Input() title!: string;
  @Input() status!: string;
  @Input() tasksQuantity!: number;
  @Input() view!: string;
  @Output() deleteSectionEvent = new EventEmitter<string>();

  sectionForm: FormGroup;

  showFormEditSection: boolean = false;
  togglePainel: boolean = false;
  modalOpen: boolean = false;

  constructor(private _eref: ElementRef, private fb: FormBuilder) {
    this.sectionForm = this.fb.group({
      sectionName: ['', Validators.required]
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.togglePainel = false;
    }
  }

  togglePainelVisibility() {
    this.togglePainel = !this.togglePainel;
  }

  openEditSection() {
    this.showFormEditSection = !this.showFormEditSection; 
    this.togglePainel = false;
    this.sectionForm.get('sectionName')?.setValue(this.title);
  }

  editSection() {
    this.title = this.sectionForm.get('sectionName')?.value;
    this.sectionForm.get('sectionName')?.setValue('');
    this.showFormEditSection = false;
  }

  onDivClick(event: Event) {
    event!.stopPropagation();
  }

  openModal() {
    this.modalOpen = true;
    this.togglePainel = false;
  }

  closeModal() {
    this.modalOpen = false;
  }

  deleteSection() {
    this.deleteSectionEvent.emit(this.status);
  }

}
