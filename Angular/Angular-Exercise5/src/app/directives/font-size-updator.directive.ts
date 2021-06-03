import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fontSizeUpdator]'
})
export class FontSizeUpdatorDirective {

  constructor(private el: ElementRef) { }

  @Input('fontSizeUpdator') fontSize: string;
  actualFontSize:string;

  // On mouse leave set font-size to given font size if available or if not then 30px
  @HostListener('mouseenter') onMouseEnter() {
    this.setFontSize(this.fontSize || '30px');
  }

  // On mouse leave set font-size to previos font-size
  @HostListener('mouseleave') onMouseLeave() {
    this.setFontSize(this.actualFontSize);
  }

  // This function is responsible for set the font size
  private setFontSize(fontSize: string) {
    // Save current font size
    this.actualFontSize=this.el.nativeElement.style.fontSize;

    // Update font-size
    this.el.nativeElement.style.fontSize = fontSize;
  }

}
