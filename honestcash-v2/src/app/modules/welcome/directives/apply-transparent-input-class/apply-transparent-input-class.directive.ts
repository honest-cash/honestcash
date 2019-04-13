import { Directive, OnInit, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[applyTransparentInputClass]',
})
export class ApplyTransparentInputClassDirective implements OnInit {

  constructor(
    el: ElementRef,
  ) {
    el.nativeElement.className += ' w-full p-4 bg-white border-2 border-transparent' +
    'border-solid font-bold text-black rounded-lg opacity-75';
  }

  ngOnInit() {

  }

}
