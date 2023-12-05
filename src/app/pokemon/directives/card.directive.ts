import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCard]'
})
export class CardDirective {
  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009688';
  private defaultHeight: number = 180;

  constructor(private domElement: ElementRef) { 
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
  }

  // personnaliser la directive
  @Input('appCard') borderColor!: string;

  // ecouter les actions de l'utilisateur
  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder( this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
  }

  // set the height
  setHeight(height: number) {
    this.domElement.nativeElement.style.height = `${height}px`;
  }

  // set the border color
  setBorder(color: string) {
    this.domElement.nativeElement.style.border = `solid 4px ${color}`;
  }
}
