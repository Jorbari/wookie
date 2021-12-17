import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieModel } from '../model/movie.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie!: MovieModel;
  @Output() close = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public closeView(): void {
    this.close.emit()
  }

}
