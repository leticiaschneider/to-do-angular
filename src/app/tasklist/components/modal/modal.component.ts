import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.isOpen = false;
    this.closed.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
