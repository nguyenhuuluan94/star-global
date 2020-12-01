import {Component, HostListener} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('transition', [
      state('oldState', style({
        left: '{{leftIndex}}px',
        top: '{{topIndex}}px'
      }), {
        params: {leftIndex: 0, topIndex: 0}
      }),
      state('newState', style({
        left: '{{leftIndex}}px',
        top: '{{topIndex}}px'
      }), {
        params: {leftIndex: 0, topIndex: 0}
      }),
      transition('* => *', animate('{{timing}}ms ease-out'), {
        params: {timing: 0}
      })
    ])
  ]
})
export class AppComponent {
  changePosition = false;
  leftIndex = 0;
  topIndex = 100;
  timing = 250;

  private timingHeight = 100;
  private boxHeight = 50;

  @HostListener('document:click', ['$event'])
  public documentClick(event: MouseEvent): void {
    this.checkWindowOutbound(event.x, event.y);
    this.changePosition = !this.changePosition;
  }

  private checkWindowOutbound(leftIndex: number, topIndex: number): void {
    this.leftIndex = leftIndex - this.boxHeight / 2;
    this.topIndex = topIndex - this.boxHeight / 2;

    this.formatIndexOnBoundaryClick(leftIndex, topIndex);
  }

  private formatIndexOnBoundaryClick(leftIndex: number, topIndex: number): void {
    this.preventLeftOutboundClick(leftIndex);
    this.preventRightOutBoundClick(leftIndex);
    this.preventTopOutboundClick(topIndex);
    this.preventBottomOutboundClick(topIndex);
  }


  private preventLeftOutboundClick(leftIndex): void {
    if (leftIndex < this.boxHeight / 2) {
      this.leftIndex = 0;
    }
  }

  private preventRightOutBoundClick(leftIndex): void {
    const ww = window.innerWidth;
    if (leftIndex + this.boxHeight / 2 > ww) {
      this.leftIndex = ww - this.boxHeight;
    }
  }

  private preventTopOutboundClick(topIndex: number): void {
    if (topIndex - this.boxHeight / 2 < this.timingHeight) {
      this.topIndex = this.timingHeight;
    }
  }

  private preventBottomOutboundClick(topIndex): void {
    const wh = window.innerHeight;
    if (topIndex + this.boxHeight / 2 > wh) {
      this.topIndex = wh - this.boxHeight;
    }
  }
}
