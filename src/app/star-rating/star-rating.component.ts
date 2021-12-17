import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit, OnChanges {
  @Input() rating: number = 0;
  movieRating: number = 0;

  rates: any[] = [
    {
      active: false
    },
    {
      active: false
    },
    {
      active: false
    },
    {
      active: false
    },
    {
      active: false
    },
  ];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {

    this.convertToStarRating()
  }

  ngOnInit(): void {
  }

  public convertToStarRating(): void {

    this.movieRating = Math.round(this.rating * 0.5);

    for(let i = 0; i < this.movieRating; i++) {
      this.rates[i].active = true;
    }

  }

}
