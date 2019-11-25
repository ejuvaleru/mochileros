import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  isHidden: boolean;

  @Input('header') header: any;
  constructor(
    public element: ElementRef,
    public renderer: Renderer
  ) { }
  ngOnInit() {
    this.renderer.setElementStyle(this.header.el, 'webkitTransition', 'top 500ms');
  }
  onContentScroll(event) {
    if (event.detail.deltaY > 0) {
      if (event.detail.deltaY > 0 && this.isHidden) return;
      if (event.detail.deltaY < 0 && !this.isHidden) return;
      this.renderer.setElementStyle(this.header.el, 'top', '-56px');
      this.isHidden = true;
    }
    else {
      this.renderer.setElementStyle(this.header.el, 'top', '0px');
      this.isHidden = false;
    }
  }
}
