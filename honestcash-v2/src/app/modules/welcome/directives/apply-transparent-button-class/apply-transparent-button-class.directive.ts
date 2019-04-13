import { Directive, OnInit, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[applyTransparentButtonClass]',
})
export class ApplyTransparentButtonClassDirective implements OnInit {

  constructor(
    el: ElementRef,
  ) {
    el.nativeElement.className += ' w-full px-24 lg:px-16 sm:px-16 py-4 bg-transparent border-2 border-white border-solid font-bold text-white uppercase rounded-lg mt-2 opacity-75';
  }

  ngOnInit() {

  }

}
