import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchInputService } from '../service/searchInput.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  search = new FormControl();

  constructor(private searchService: SearchInputService) { }

  ngOnInit(): void {

    this.search.valueChanges.pipe( debounceTime(350), distinctUntilChanged() ).subscribe({
      next: (query) => {
        this.searchService.addQuery(query);
      }
    })

  }


}
