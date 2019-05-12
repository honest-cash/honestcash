import { Directive, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {
  @Input('tooltip') tooltip: string;
  @Input() placement: string;
  @Input() delay: number;
  element: HTMLElement;
  offset = 10;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.element) { this.show(); }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.element) { this.hide(); }
  }

  show() {
    this.create();
    this.setPosition();
    this.renderer.addClass(this.element, 'ng-tooltip-show');
  }

  hide() {
    this.renderer.removeClass(this.element, 'ng-tooltip-show');
    window.setTimeout(() => {
      this.renderer.removeChild(document.body, this.element);
      this.element = null;
    }, this.delay);
  }

  create() {
    this.element = this.renderer.createElement('span');

    this.renderer.appendChild(
      this.element,
      this.renderer.createText(this.tooltip) // textNode
    );

    this.renderer.appendChild(document.body, this.element);
    // this.renderer.appendChild(this.elementRef.nativeElement, this.element);

    this.renderer.addClass(this.element, 'ng-tooltip');
    this.renderer.addClass(this.element, `ng-tooltip-${this.placement}`);

    // delay 설정
    this.renderer.setStyle(this.element, '-webkit-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.element, '-moz-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.element, '-o-transition', `opacity ${this.delay}ms`);
    this.renderer.setStyle(this.element, 'transition', `opacity ${this.delay}ms`);
  }

  setPosition() {
    const hostPos = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipPos = this.element.getBoundingClientRect();
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let top, left;

    if (this.placement === 'top') {
      top = hostPos.top - tooltipPos.height - this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'bottom') {
      top = hostPos.bottom + this.offset;
      left = hostPos.left + (hostPos.width - tooltipPos.width) / 2;
    }

    if (this.placement === 'left') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.left - tooltipPos.width - this.offset;
    }

    if (this.placement === 'right') {
      top = hostPos.top + (hostPos.height - tooltipPos.height) / 2;
      left = hostPos.right + this.offset;
    }

    this.renderer.setStyle(this.element, 'top', `${top + scrollPos}px`);
    this.renderer.setStyle(this.element, 'left', `${left}px`);
  }
}
