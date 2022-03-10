import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseup') onMouseup(){
    (this.el.nativeElement as HTMLElement).getAttribute('placeholder')
  }
}
