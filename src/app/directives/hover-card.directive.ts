import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[feedHoverCard]' 
})
export class HoverCardDirective {
	constructor(private el: ElementRef) {
		this.setBorder('#fefefe');
	}
	@HostListener('mouseenter')onMouseEnter(){
		this.setBorder('#306BA5');
	}
	@HostListener('mouseleave')onMouseLeave(){
		this.setBorder('#fefefe');
	}

	private setBorder(color: string) {
		let border = 'solid 4px ' + color;
		this.el.nativeElement.style.border = border;
	}
}