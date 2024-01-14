import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button-painel',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './button-painel.component.html',
  styleUrl: './button-painel.component.scss'
})
export class ButtonPainelComponent {
  @Input() showPainel: boolean = false;
  @Output() editClick = new EventEmitter<number>();
  @Output() deleteClick = new EventEmitter<number>();

  constructor(private _eref: ElementRef) {}

  onDivClick(event: Event) {
    event!.stopPropagation();
  }

  openEditTask(){
    this.editClick.emit();
  }

  openModal() {
    this.deleteClick.emit();
  }
}
