import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autoResize]',
  standalone:true,
})
export class AutoResizeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjustTextArea();
  }

  ngAfterViewInit(): void {
    this.adjustTextArea();
  }

  adjustTextArea(): void {
    this.renderer.setStyle(this.el.nativeElement, 'height', '0px');
    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.el.nativeElement.scrollHeight}px`);
  }
}