import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appProductHover]'
})
export class ProductHoverDirective {
  @HostListener('mouseenter') onMouseEnter() {
    this.prodBg('yellow');
  }
  constructor(private el: ElementRef) { }

  private prodBg(color: string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
