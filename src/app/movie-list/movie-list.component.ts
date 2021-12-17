import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../model/movie.model';
import { SearchInputService } from '../service/searchInput.service';
import { WookieService } from '../service/wookie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  genreMovies = new Map();
  movies: [string, MovieModel[]][] = [];
  toggleMovieDetialView: boolean = false;

  isLoading: boolean;

  selectedMovie!: MovieModel;

  constructor(
    private movieService: WookieService,
    private searchService: SearchInputService,
    private snackBar: MatSnackBar
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getMovies();

    this.searchService.getQuery().subscribe({
      next: (query) => {
        this.toggleMovieDetialView = false;
        this.getSearchResult(query);
      },
    });
  }

  public getMovies(): void {
    this.movieService.getMovies().subscribe({
      next: ({ movies }) => {
        this.reshapeMoviesData(movies);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.openSnackbar('an error occurred, please try again');
      },
    });
  }

  private reshapeMoviesData(movies: any[]): void {
    this.movies = [];
    if (movies.length < 1) return;

    movies.forEach((movie: any) => {
      movie.genres.forEach((genre: any) => {
        if (this.genreMovies.has(genre)) {
          let movies = this.genreMovies.get(genre);
          movies.push(movie);
          this.genreMovies.set(genre, movies);
        } else {
          this.genreMovies.set(genre, [movie]);
        }
      });
    });
    for (let genre of this.genreMovies.entries()) {
      this.movies.push(genre);
    }
  }

  public getSearchResult(searchQuery: string): void {
    this.isLoading = true;
    this.movieService.searchMovies(searchQuery).subscribe({
      next: ({ movies }) => {
        this.isLoading = false;
        this.reshapeMoviesData(movies);
      },
      error: () => {
        this.isLoading = false;
        this.openSnackbar('an error occurred, please try again');
      },
    });
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  public selectMovieCard(movie: MovieModel): void {
    this.toggleMovieDetialView = true;
    this.selectedMovie = movie;
  }

  public closeView(): void {
    this.toggleMovieDetialView = false;
  }
}
