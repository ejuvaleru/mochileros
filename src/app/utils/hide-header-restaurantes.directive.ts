import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({
  selector: '[appHideHeaderRestaurantes]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderRestaurantesDirective {

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
      this.renderer.setElementStyle(this.header.el, 'top', '-56px');
    }
    else {
      this.renderer.setElementStyle(this.header.el, 'top', '0px');
    }
  }

}
