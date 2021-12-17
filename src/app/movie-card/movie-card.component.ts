import { Component, Input, OnInit } from '@angular/core';
import { MovieModel } from '../model/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie!: MovieModel;

  constructor() { }

  ngOnInit(): void {
  }

}
