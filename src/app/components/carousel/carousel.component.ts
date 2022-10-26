import { Component, OnInit, Input } from '@angular/core';
import { ICarouselItem } from './Icarousel-item.metadata';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  /**
   * Custom Properties: https://www.youtube.com/watch?v=fouPWy66YYQ&ab_channel=Designicode
   */
  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() items: ICarouselItem[] = [];

  /**
   * Final Properties
   */
  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor(private router: Router) {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
   }

  ngOnInit() {
    this.items.map( ( i, index ) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;


      this.items.find(i => i.id === 0)!.marginLeft=-100 * position;
    
   
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.items.length - 1) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items.find(i => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition  - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items.find(i => i.id === 0)!.marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }

  seleccionar(){
    switch ( this.currentPosition ) {
      case 0:
          this.router.navigate(['/json']);
          break;
      case 1:
        this.router.navigate(['/csv']);
          break;
      case 2:
        this.router.navigate(['/xml']);
          break;
      case 3:
        this.router.navigate(['/xls']);
        break;
      case 4:
        this.router.navigate(['/shp']);
        break;
      default: 
          // 
          break;
   }
  }

}
