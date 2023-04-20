import { Directive, ElementRef, Renderer2, HostListener, Input, ContentChild, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[customTooltip]'
})

export class CustomTooltipDirective implements AfterViewInit{
  @Input() tooltipPosition: string = "top";
  @ContentChild('tooltip') tooltip!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    console.debug(this.tooltip);
    this.tooltip.nativeElement.style.display = 'none';
    this.tooltip.nativeElement.style.position = 'absolute';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  private showTooltip() {
    this.tooltip.nativeElement.style.display = '';
    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = this.tooltip.nativeElement.getBoundingClientRect();

    let top, left;

    switch (this.tooltipPosition) {
      case 'top':
        top = hostPos.top - tooltipPos.height - 5;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'right':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.right + 5;
        break;
      case 'bottom':
        top = hostPos.bottom + 5;
        left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
        break;
      case 'left':
        top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
        left = hostPos.left - tooltipPos.width - 5;
        break;
    }
    this.tooltip.nativeElement.style.top = `${top}px`;
    this.tooltip.nativeElement.style.left = `${left}px`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private hideTooltip() {
    this.tooltip.nativeElement.style.display = 'none';
  }
}
