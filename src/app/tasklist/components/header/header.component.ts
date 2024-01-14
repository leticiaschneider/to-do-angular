import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() valueToggleButton = new EventEmitter<boolean>();
  toggleValue: boolean = true;
  
  @Output() textSearchChange = new EventEmitter<string>();
  textSearch: string = '';

  // Emits the value of the search input when the text changes
  emitTextSearch() {
    this.textSearchChange.emit(this.textSearch);
  }

  // Toggles the value of the toggle button and emits the new value
  toggle() {
    this.toggleValue = !this.toggleValue;
    this.valueToggleButton.emit(this.toggleValue);
  }
}
