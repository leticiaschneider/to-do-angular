import { Component, ElementRef, Input, SimpleChanges } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  imports: [HttpClientModule],
  template: `<span [innerHTML]="svgIcon"></span>`,
  styles: [
    `
      span {
        fill: var(--icon-color);
      }
    `,
  ],
})
export class IconComponent {
  @Input()
  public name?: string;
  @Input()
  public color?: string;
  @Input()
  public width?: string;
  @Input()
  public height?: string;

  public svgIcon?: SafeHtml;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  public ngOnInit(): void {
    if (this.color) {
      this.elementRef.nativeElement.style.setProperty('--icon-color', this.color);
    }

    this.getIcon();
  }

  private getIcon() {
    this.httpClient.get(`assets/icons/${this.name}.svg`, { responseType: 'text' }).subscribe((value) => {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
    });
  }

  ngAfterViewChecked() {
    if (this.width) {
      this.elementRef.nativeElement.querySelector('svg')?.setAttribute('width', this.width);
    }

    if (this.height) {
      this.elementRef.nativeElement.querySelector('svg')?.setAttribute('height', this.height);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name'].currentValue === changes['name'].previousValue) return;

    this.getIcon();
  }
}